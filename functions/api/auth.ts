import { Env } from "../Env";
import { ApiResponse } from "../ApiResponse";
//import { OAuth2Client } from 'google-auth-library';

export const onRequest: PagesFunction<Env> = async (context) => {

    var requestData: any = await context.request.json();
    var credential: string = requestData.credential;

    // const client = new OAuth2Client();
    // async function verify() {
    //     const ticket = await client.verifyIdToken({
    //         idToken: credential,
    //         audience: '58371505-mdr56o2n4roesstr8s8p3i69r31n1kur.apps.googleusercontent.com'
    //     });
    //     const payload = ticket.getPayload();
    //     const userid = payload['sub'];
    //     // If request specified a G Suite domain:
    //     // const domain = payload['hd'];
    // }
    // verify().catch(console.error);

    return new ApiResponse();
}
