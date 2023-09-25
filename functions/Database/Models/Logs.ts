import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const logs = sqliteTable("logs", {
    message: text('message'),
    createdAt: integer('createdAt')
})