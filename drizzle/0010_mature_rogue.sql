DO $$ BEGIN
 CREATE TYPE "public"."review_task_type" AS ENUM('edit', 'create', 'report', 'post');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review_task" (
	"id" serial PRIMARY KEY NOT NULL,
	"entity_id" integer NOT NULL,
	"editor_id" text NOT NULL,
	"reward_id" integer NOT NULL,
	"type" "review_task_type" NOT NULL,
	"change" json,
	"proof_image" varchar(192)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review_task" ADD CONSTRAINT "review_task_entity_id_invaders_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."invaders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review_task" ADD CONSTRAINT "review_task_editor_id_user_id_fk" FOREIGN KEY ("editor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review_task" ADD CONSTRAINT "review_task_reward_id_reward_type_id_fk" FOREIGN KEY ("reward_id") REFERENCES "public"."reward_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
