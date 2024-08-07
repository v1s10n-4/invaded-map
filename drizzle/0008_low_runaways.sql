DO $$ BEGIN
 CREATE TYPE "rewardableActionType" AS ENUM('POPULARITY', 'CONTRIBUTION', 'ACHIEVEMENT', 'TOXICITY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reward_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" text,
	"points" smallint DEFAULT 1 NOT NULL,
	"type" "rewardableActionType" NOT NULL,
	CONSTRAINT "reward_type_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_rewards" (
	"user_id" text NOT NULL,
	"reward_id" integer NOT NULL,
	CONSTRAINT "users_to_rewards_pk" PRIMARY KEY("reward_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "referral_links" RENAME COLUMN "userId" TO "referrer_id";--> statement-breakpoint
ALTER TABLE "referral_links" DROP CONSTRAINT "referral_links_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "referral_links" ADD COLUMN "reward_type_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referral_links" ADD CONSTRAINT "referral_links_referrer_id_user_id_fk" FOREIGN KEY ("referrer_id") REFERENCES "user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referral_links" ADD CONSTRAINT "referral_links_reward_type_id_reward_type_id_fk" FOREIGN KEY ("reward_type_id") REFERENCES "reward_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_rewards" ADD CONSTRAINT "users_to_rewards_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_rewards" ADD CONSTRAINT "users_to_rewards_reward_id_reward_type_id_fk" FOREIGN KEY ("reward_id") REFERENCES "reward_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_unique" UNIQUE("id");