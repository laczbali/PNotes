import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const googleKeys = sqliteTable("GoogleKeys", {

    id: text('Id')
        .primaryKey(),

    key: text('Key')

})