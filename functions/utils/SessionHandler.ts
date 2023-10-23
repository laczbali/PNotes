import { drizzle } from "drizzle-orm/d1";
import { Env } from "../Env";
import { googleKeys } from "../Database/Models/GoogleKeys";
import { desc, eq } from "drizzle-orm";
import * as jose from 'jose'

export class SessionHandler {

    /**
     * 1. Performs JWT validation as outlined in https://developers.google.com/identity/sign-in/web/backend-auth#verify-the-integrity-of-the-id-token
     * 2. Creates a new local session
     * 3. Returns info for session cookie
     * @param context Request context
     * @returns 
     */
    public static async StartSession(context: EventContext<Env, any, Record<string, unknown>>): Promise<any> {
        var requestData: any = await context.request.json();
        var credential: string = requestData?.credential;

        if (credential == null || credential == undefined) {
            throw new SessionError('Credential is missing', 'INVALID_CREDENTIALS');
        }

        // key ID is present in JWT header (kid), need to find the correect key
        var credHeader = jose.decodeProtectedHeader(credential);
        var keyId = credHeader.kid;

        // get current Google public key
        type keyType = typeof googleKeys.$inferInsert;
        const db = drizzle(context.env.DB_CONN);
        var currentKey: keyType = (await db
            .select()
            .from(googleKeys)
            .where(
                eq(googleKeys.id, keyId)
            ))
            .at(0);

        if (currentKey == null || currentKey == undefined) {
            const remoteKeyResponse = await fetch('https://www.googleapis.com/oauth2/v3/certs');

            const cacheControlHeader = remoteKeyResponse.headers.get('cache-control');
            const maxAgeValue = cacheControlHeader
                .split(',')
                .find((value) => value.trim().startsWith('max-age'))
                .split('=')[1];
            const maxAge = parseInt(maxAgeValue);
            const expiresAt = new Date();
            expiresAt.setSeconds(expiresAt.getSeconds() + maxAge);
            const expiresAtString = expiresAt.toISOString();

            const remoteKeyData: any = await remoteKeyResponse.json();
            const keyDbObjects: keyType[] = remoteKeyData.keys.map((key: any) => {
                return {
                    id: key.kid,
                    key: JSON.stringify(key)
                };
            });

            await db.insert(googleKeys).values(keyDbObjects);
            currentKey = keyDbObjects.find((key) => key.id == keyId);

            if(currentKey == null || currentKey == undefined) {
                throw new SessionError('Key not found', 'INTERNAL_ERROR');
            }
        }

        // verify JWT is signed by Google
        const publicKey = await jose.importJWK(JSON.parse(currentKey.key), 'RS256');
        var verificationResult : jose.JWTPayload = null;
        try
        {
            verificationResult = (await jose.jwtVerify(credential, publicKey)).payload;
        }
        catch(e) {
            throw new SessionError('Failed to validate credentials', 'INVALID_CREDENTIALS');
        }

        // verify that values are correct
        const validISSvals = ['accounts.google.com', 'https://accounts.google.com'];
        if(!validISSvals.includes(verificationResult.iss)) {
            throw new SessionError('Invalid issuer', 'INVALID_CREDENTIALS');
        }

        const validClientIds = ['58371505-mdr56o2n4roesstr8s8p3i69r31n1kur.apps.googleusercontent.com'];
        if(typeof verificationResult.aud == 'string') {
            verificationResult.aud = [verificationResult.aud];
        }
        if(!verificationResult.aud.every((aud: string) => validClientIds.includes(aud))) {
            throw new SessionError('Invalid audience', 'INVALID_CREDENTIALS');
        }

        var expiresAt = new Date(verificationResult.exp * 1000);
        if(expiresAt < new Date()) {
            throw new SessionError('Expired credential', 'INVALID_CREDENTIALS');
        }

        // create new session

        return null;
    }

}

export class SessionError extends Error {

    public readonly reason: 'INVALID_CREDENTIALS' | 'UNAUTHORIZED' | 'INTERNAL_ERROR';

    constructor(message: string, reason: 'INVALID_CREDENTIALS' | 'UNAUTHORIZED' | 'INTERNAL_ERROR') {
        super(message);
        this.reason = reason;
    }
}

