import { Env } from "../Env";
import { ApiResponse } from "../utils/ApiResponse";
import { SessionError, SessionHandler } from "../utils/SessionHandler";

export const onRequest: PagesFunction<Env> = async (context) => {
    try {
        var res = await SessionHandler.StartSession(context);
        return new ApiResponse();
    } catch (error) {
        if (error instanceof SessionError) {
            switch (error.reason) {
                case 'INVALID_CREDENTIALS':
                    return new ApiResponse('INVALID_CREDENTIALS', 400);
                case 'UNAUTHORIZED':
                    return new ApiResponse('UNAUTHORIZED', 401);
                case 'INTERNAL_ERROR':
                    return new ApiResponse('INTERNAL_ERROR', 500);
            }
        } else {
            console.log(error);
            return new ApiResponse('INTERNAL_ERROR', 500);
        }
    }
}
