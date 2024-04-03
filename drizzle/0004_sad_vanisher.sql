DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'poweruser', 'moderator', 'admin', 'superuser');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'user' NOT NULL;