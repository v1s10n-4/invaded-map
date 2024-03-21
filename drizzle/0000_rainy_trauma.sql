DO $$ BEGIN
 CREATE TYPE "invader_state" AS ENUM('A', 'DG', 'H', 'D', 'DD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invaders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(16) NOT NULL,
	"city" varchar(32) NOT NULL,
	"city_name" varchar(64) NOT NULL,
	"state" "invader_state" NOT NULL,
	"thumbnail" text NOT NULL,
	"points" smallint NOT NULL,
	"create_date" timestamp NOT NULL,
	"update_date" timestamp,
	"location" "point",
	"info" text,
	"comment" text,
	"images" jsonb
);
