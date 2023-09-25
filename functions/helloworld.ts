import { drizzle } from 'drizzle-orm/d1';
import { Env } from "./Env";
import { logs } from './Database/Models/Logs';

export const onRequest: PagesFunction<Env> = async (context) => {

    var db = drizzle(context.env.DB_CONN);
    var results = await db.select().from(logs).all();
    console.log(JSON.stringify(results));

    return new Response(`hello`);
}
