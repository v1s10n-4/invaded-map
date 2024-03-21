ALTER TABLE "invaders" ALTER COLUMN "images" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "invaders" ALTER COLUMN "images" SET NOT NULL;