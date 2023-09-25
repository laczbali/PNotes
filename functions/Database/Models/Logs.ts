import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const logs = sqliteTable("Logs", {

    createdAt: text('CreatedAt')
        .notNull()
        .default(sql`current_timestamp`),

    level: text('Level')
        .$type<'debug' | 'info' | 'warning' | 'error'>()
        .notNull(),

    message: text('Message')
        .notNull(),

    error: text('Error')

})