import { relations } from "drizzle-orm/relations";
import { user, contributions, invaders, referralLinks, rewardType, session, reviewTask, usersToRewards, account } from "./schema";

export const contributionsRelations = relations(contributions, ({one}) => ({
	user_editorId: one(user, {
		fields: [contributions.editorId],
		references: [user.id],
		relationName: "contributions_editorId_user_id"
	}),
	invader: one(invaders, {
		fields: [contributions.entityId],
		references: [invaders.id]
	}),
	user_reviewerId: one(user, {
		fields: [contributions.reviewerId],
		references: [user.id],
		relationName: "contributions_reviewerId_user_id"
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	contributions_editorId: many(contributions, {
		relationName: "contributions_editorId_user_id"
	}),
	contributions_reviewerId: many(contributions, {
		relationName: "contributions_reviewerId_user_id"
	}),
	referralLinks: many(referralLinks),
	sessions: many(session),
	reviewTasks: many(reviewTask),
	usersToRewards: many(usersToRewards),
	accounts: many(account),
}));

export const invadersRelations = relations(invaders, ({many}) => ({
	contributions: many(contributions),
	reviewTasks: many(reviewTask),
}));

export const referralLinksRelations = relations(referralLinks, ({one}) => ({
	user: one(user, {
		fields: [referralLinks.referrerId],
		references: [user.id]
	}),
	rewardType: one(rewardType, {
		fields: [referralLinks.rewardTypeId],
		references: [rewardType.id]
	}),
}));

export const rewardTypeRelations = relations(rewardType, ({many}) => ({
	referralLinks: many(referralLinks),
	reviewTasks: many(reviewTask),
	usersToRewards: many(usersToRewards),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const reviewTaskRelations = relations(reviewTask, ({one}) => ({
	user: one(user, {
		fields: [reviewTask.editorId],
		references: [user.id]
	}),
	invader: one(invaders, {
		fields: [reviewTask.entityId],
		references: [invaders.id]
	}),
	rewardType: one(rewardType, {
		fields: [reviewTask.rewardId],
		references: [rewardType.id]
	}),
}));

export const usersToRewardsRelations = relations(usersToRewards, ({one}) => ({
	rewardType: one(rewardType, {
		fields: [usersToRewards.rewardId],
		references: [rewardType.id]
	}),
	user: one(user, {
		fields: [usersToRewards.userId],
		references: [user.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));