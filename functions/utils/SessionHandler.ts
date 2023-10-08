import { drizzle } from "drizzle-orm/d1";
import { Env } from "../Env";
import { googleKeys } from "../Database/Models/GoogleKeys";
import { desc } from "drizzle-orm";
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

        // TODO: key ID is present in JWT header (kid), need to find the correect key

        // get current Google public key
        const db = drizzle(context.env.DB_CONN);
        const storedKeys = await db.select().from(googleKeys);

        if (currentKey == null || currentKey == undefined || new Date(currentKey.expiresAt) < new Date()) {
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
            const keyDbObjects = remoteKeyData.keys.map((key: any) => {
                return {
                    expiresAt: expiresAtString,
                    key: JSON.stringify(key)
                };
            });

            await db.insert(googleKeys).values(keyDbObjects);

        }



        // verify JWT is signed by Google
        const publicKey = await jose.importJWK(currentKeyData);

        console.log(JSON.stringify(currentKeyData));

        var verificationResult = await jose.jwtVerify(credential, publicKey);




        // verify that values are correct

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

