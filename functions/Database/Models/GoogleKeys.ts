import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const googleKeys = sqliteTable("GoogleKeys", {

    id: integer('Id')
        .primaryKey({ autoIncrement: true }),

    expiresAt: text('ExpiresAt')
        .notNull(),

    key: text('Key')

})