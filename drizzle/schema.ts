import { pgTable, foreignKey, serial, integer, text, varchar, timestamp, jsonb, smallint, point, unique, json, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const contributionType = pgEnum("contribution_type", ['edit', 'create', 'delete'])
export const invaderState = pgEnum("invader_state", ['A', 'DG', 'H', 'D', 'DD', 'U'])
export const referralType = pgEnum("referral_type", ['basic', 'qr-code', 'email'])
export const reviewTaskType = pgEnum("review_task_type", ['edit', 'create', 'report', 'post'])
export const rewardableActionType = pgEnum("rewardableActionType", ['POPULARITY', 'CONTRIBUTION', 'ACHIEVEMENT', 'TOXICITY'])
export const role = pgEnum("role", ['user', 'poweruser', 'moderator', 'admin', 'superuser'])


export const contributions = pgTable("contributions", {
	id: serial().primaryKey().notNull(),
	entityId: integer("entity_id").notNull(),
	editorId: text("editor_id").notNull(),
	reviewerId: text("reviewer_id").notNull(),
	comment: varchar({ length: 72 }),
	type: contributionType().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	data: jsonb(),
}, (table) => [
	foreignKey({
			columns: [table.editorId],
			foreignColumns: [user.id],
			name: "contributions_editor_id_user_id_fk"
		}),
	foreignKey({
			columns: [table.entityId],
			foreignColumns: [invaders.id],
			name: "contributions_entity_id_invaders_id_fk"
		}),
	foreignKey({
			columns: [table.reviewerId],
			foreignColumns: [user.id],
			name: "contributions_reviewer_id_user_id_fk"
		}),
]);

export const invaders = pgTable("invaders", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 16 }).notNull(),
	city: varchar({ length: 32 }).notNull(),
	cityName: varchar("city_name", { length: 64 }).notNull(),
	state: invaderState().notNull(),
	thumbnail: text().notNull(),
	points: smallint().notNull(),
	createDate: timestamp("create_date", { mode: 'string' }).notNull(),
	updateDate: timestamp("update_date", { mode: 'string' }),
	location: point(),
	info: text(),
	comment: text(),
	images: jsonb().default([]).notNull(),
});

export const referralLinks = pgTable("referral_links", {
	id: serial().primaryKey().notNull(),
	referrerId: text("referrer_id").notNull(),
	code: text().notNull(),
	type: referralType().default('basic').notNull(),
	used: smallint().default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	rewardTypeId: integer("reward_type_id"),
}, (table) => [
	foreignKey({
			columns: [table.referrerId],
			foreignColumns: [user.id],
			name: "referral_links_referrer_id_user_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.rewardTypeId],
			foreignColumns: [rewardType.id],
			name: "referral_links_reward_type_id_reward_type_id_fk"
		}),
	unique("referral_links_code_unique").on(table.code),
]);

export const rewardType = pgTable("reward_type", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 64 }).notNull(),
	points: smallint().default(1).notNull(),
	type: rewardableActionType().notNull(),
	description: text(),
}, (table) => [
	unique("reward_type_name_unique").on(table.name),
]);

export const session = pgTable("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const reviewTask = pgTable("review_task", {
	id: serial().primaryKey().notNull(),
	editorId: text("editor_id").notNull(),
	rewardId: integer("reward_id").notNull(),
	type: reviewTaskType().notNull(),
	change: json().notNull(),
	proofImage: varchar("proof_image", { length: 192 }).notNull(),
	entityId: integer("entity_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.editorId],
			foreignColumns: [user.id],
			name: "review_task_editor_id_user_id_fk"
		}),
	foreignKey({
			columns: [table.entityId],
			foreignColumns: [invaders.id],
			name: "review_task_entity_id_invaders_id_fk"
		}),
	foreignKey({
			columns: [table.rewardId],
			foreignColumns: [rewardType.id],
			name: "review_task_reward_id_reward_type_id_fk"
		}),
]);

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: timestamp({ mode: 'string' }),
	image: text(),
	role: role().default('user').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	referrerLinkId: integer("referrer_link_id"),
}, (table) => [
	unique("user_id_unique").on(table.id),
]);

export const usersToRewards = pgTable("users_to_rewards", {
	userId: text("user_id").notNull(),
	rewardId: integer("reward_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.rewardId],
			foreignColumns: [rewardType.id],
			name: "users_to_rewards_reward_id_reward_type_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "users_to_rewards_user_id_user_id_fk"
		}),
	primaryKey({ columns: [table.userId, table.rewardId], name: "users_to_rewards_pk"}),
]);

export const verificationToken = pgTable("verificationToken", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk"}),
]);

export const account = pgTable("account", {
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"}),
]);
