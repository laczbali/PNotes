import { drizzle } from 'drizzle-orm/d1';
import { Env } from "../Env";
import { logs } from '../Database/Models/Logs';
import { ApiResponse } from '../ApiResponse';

export const onRequest: PagesFunction<Env> = async (context) => {

    type LogType = typeof logs.$inferInsert;
    var newLog: LogType = {
        level: 'debug',
        message: 'log message'
    };

    const db = drizzle(context.env.DB_CONN);
    await db.insert(logs).values(newLog);

    return new ApiResponse(`hello`);
}
