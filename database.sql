
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE database "plug-n-play"

CREATE TABLE "user" (
	"id" 								serial NOT NULL,
	"username" 					varchar(255) NOT NULL UNIQUE,
	"password" 					varchar(255) NOT NULL,
	"profile_img_path"	varchar(255),
	"access_level"			int NOT NULL
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "tag" (
	"id" 		serial NOT NULL,
	"name" 	varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "tag_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "user_tags" (
	"id" 				serial NOT NULL,
	"user_id" 	int NOT NULL,
	"tag_id" 		int NOT NULL,
	"score" 		float NOT NULL,
	CONSTRAINT "user_tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "played" (
	"id" 				serial NOT NULL,
	"user_id" 	int NOT NULL,
	"game_id" 	int NOT NULL,
	"liked" 		int NOT NULL,
	CONSTRAINT "played_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "wishlist" (
	"id"			serial NOT NULL,
	"user_id" int NOT NULL,
	"game_id" int NOT NULL,
	CONSTRAINT "wishlist_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ignorelist" (
	"id" 			serial NOT NULL,
	"user_id" int NOT NULL,
	"game_id" int NOT NULL,
	CONSTRAINT "ignorelist_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "glossary" (
	"id" 					serial NOT NULL,
	"term" 				varchar(255) NOT NULL UNIQUE,
	"description" varchar(1023) NOT NULL,
	"img_path" 		varchar(255) NOT NULL,
	"tag_id" 			varchar(255),
	CONSTRAINT "glossary_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "user_tags" ADD CONSTRAINT "user_tags_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_tags" ADD CONSTRAINT "user_tags_fk1" FOREIGN KEY ("tag_id") REFERENCES "tag"("id");
ALTER TABLE "played" ADD CONSTRAINT "played_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "ignorelist" ADD CONSTRAINT "ignorelist_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "glossary" ADD CONSTRAINT "glossary_fk0" FOREIGN KEY ("tag_id") REFERENCES "tag"("id");







