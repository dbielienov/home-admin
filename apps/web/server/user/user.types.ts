import { schema } from '@repo/api/db';

export type User = typeof schema.user.$inferSelect;
export type NewUser = typeof schema.user.$inferInsert;
export type UserUpdate = Partial<typeof schema.user.$inferInsert>;
