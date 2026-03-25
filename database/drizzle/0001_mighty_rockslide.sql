CREATE TYPE "public"."user_role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'USER' NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "techs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "techs_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "projects_to_techs" (
	"project_id" uuid NOT NULL,
	"tech_id" uuid NOT NULL,
	CONSTRAINT "projects_to_techs_project_id_tech_id_pk" PRIMARY KEY("project_id","tech_id")
);
--> statement-breakpoint
CREATE TABLE "posts_to_techs" (
	"post_id" uuid NOT NULL,
	"tech_id" uuid NOT NULL,
	CONSTRAINT "posts_to_techs_post_id_tech_id_pk" PRIMARY KEY("post_id","tech_id")
);
--> statement-breakpoint
ALTER TABLE "projects_to_techs" ADD CONSTRAINT "projects_to_techs_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_to_techs" ADD CONSTRAINT "projects_to_techs_tech_id_techs_id_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."techs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_to_techs" ADD CONSTRAINT "posts_to_techs_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_to_techs" ADD CONSTRAINT "posts_to_techs_tech_id_techs_id_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."techs"("id") ON DELETE cascade ON UPDATE no action;