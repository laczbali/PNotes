import { Log } from "./Data/Log";
import { Env } from "./Env";

export const onRequest: PagesFunction<Env> = async (context) => {
    var x = await (context.env.DB_CONN.prepare("SELECT 1 as test").all());
    console.log(JSON.stringify(x.results));

    return new Response(`hello`);
}
