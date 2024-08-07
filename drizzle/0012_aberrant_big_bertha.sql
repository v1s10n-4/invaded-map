DO $$ BEGIN
 CREATE TYPE "public"."contribution_type" AS ENUM('edit', 'create', 'delete');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contributions" (
	"id" serial PRIMARY KEY NOT NULL,
	"entity_id" integer NOT NULL,
	"editor_id" text NOT NULL,
	"reviewer_id" text NOT NULL,
	"comment" varchar(72),
	"type" "contribution_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"data" jsonb
);
--> statement-breakpoint
ALTER TABLE "review_task" ALTER COLUMN "change" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "review_task" ALTER COLUMN "proof_image" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contributions" ADD CONSTRAINT "contributions_entity_id_invaders_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."invaders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contributions" ADD CONSTRAINT "contributions_editor_id_user_id_fk" FOREIGN KEY ("editor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contributions" ADD CONSTRAINT "contributions_reviewer_id_user_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
