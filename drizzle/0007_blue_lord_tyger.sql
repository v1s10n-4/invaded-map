DO $$ BEGIN
 CREATE TYPE "referral_type" AS ENUM('basic', 'qr-code', 'email');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "referral_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"code" text NOT NULL,
	"type" "referral_type" DEFAULT 'basic' NOT NULL,
	"used" smallint DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "referral_links_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "referrer_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referral_links" ADD CONSTRAINT "referral_links_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
