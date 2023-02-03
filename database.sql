
CREATE database "plug-n-play";


CREATE TABLE "user" (
	"id" 								serial NOT NULL,
	"username" 					varchar(255) NOT NULL UNIQUE,
	"password" 					varchar(255) NOT NULL,
	"profile_img_path"	varchar(255),
	"access_level"			int NOT NULL,
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
  "tag_name"  varchar(80) NOT NULL,
	"score" 		float NOT NULL,
	CONSTRAINT "user_tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "user_genres" (
	"id"    				serial NOT NULL,
	"user_id" 	  	int REFERENCES "user" (id) NOT NULL,
	"genre_name"		varchar(80) NOT NULL,
 	"genre_score" 	float NOT NULL,
  CONSTRAINT "user_genre_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "played" (
	"id" 				serial NOT NULL,
	"user_id" 	int NOT NULL,
	"game_id" 	int NOT NULL,
	"liked" 		int,
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
	"description" varchar(1023),
	"img_path" 		varchar(255),
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

-- Glossary Terms
-- Add Tags
INSERT INTO "glossary" ("term")
VALUES ('2D'),('2D Platformer'),('3D'),('4X'),('8-Bit'),('Action RPG'),('Action RTS'),('Action Roguelike'),
('Action-Adventure'),('Agriculture'),('Alternate History'),('Anime'),('Atmospheric'),('Base Building'),
('Battle Royale'),('Beat ''em up'),('Blood'),('Building'),('Bullet Hell'),('CRPG'),('Card Game'),('Cartoon'),
('Character Customization'),('Choices Matter'),('Choose Your Own Adventure'),('Cinematic'),('City Builder'),
('Clicker'),('Co-op'),('Co-op Campaign'),('Colony Sim'),('Colorful'),('Comic Book'),('Competitive'),('Crafting'),
('Crime'),('Cute'),('Dark'),('Dark Comedy'),('Dating Sim'),('Deck Building'),('Demake'),('Demons'),('Difficult'),
('Drama'),('Driving'),('Dungeon Crawler'),('Dungeons & Dragons'),('Dystopian'),('Economy'),('Emotional'),('Epic'),
('Erotic'),('Exploration'),('FPS'),('Family Friendly'),('Fantasy'),('Farming'),('Fast-Paced'),('Feel Good'),
('Female Protagonist'),('First-Person'),('Fishing'),('Flight'),('Funny'),('Futuristic'),('Gambling'),('Gardening'),
('God Game'),('Gore'),('Hand-drawn'),('Historical'),('Horror'),('Hunting'),('Immersive Sim'),('Isometric'),('JRPG'),
('Job Simulator'),('LGBT'),('LGBTQ+'),('Linear'),('Local Co-Op'),('Local Multiplayer'),('Local PvP'),('Logic'),
('Loot'),('Lore-Rich'),('Lovecraftian'),('Low-poly'),('MMORPG'),('MOBA'),('Magic'),('Management'),('Manga'),
('Martial Arts'),('Mature'),('Meaningful Choices'),('Metroidvania'),('Military'),('Modern'),('Monsters'),
('Mountains'),('Multiplayer'),('Multiple Endings'),('Music'),('Mystery'),('NSFW'),('Narration'),('Narrative'),
('Noir'),('Non violent'),('Nonlinear'),('Nudity'),('Old School'),('Online Co-Op'),('Online PvP'),('Online multiplayer'),
('Open World'),('Parody'),('Partial Controller Support'),('Party Game'),('Party-Based RPG'),('Perma Death'),
('Photorealistic'),('Pixel Graphics'),('Point & Click'),('Political'),('Politics'),('Post-apocalyptic'),
('Precision Platformer'),('Procedural Generation'),('Psychological'),('Puzzle Platformer'),('PvE'),('PvP'),
('Quick-Time Events'),('RPG'),('RTS'),('Real Time Tactics'),('Realistic'),('Relaxing'),('Resource Management'),
('Retro'),('Rhythm'),('Roguelike'),('Roguelite'),('Roguevania'),('Role Playing Game'),('Sandbox'),('Satire'),
('Sci-fi'),('Score Attack'),('Sexual Content'),('Shared/Split Screen Co-op'),('Shared/Split Screen PvP'),
('Shoot ''Em Up'),('Short'),('Side Scroller'),('Side-Scrolling'),('Silent Protagonist'),('Single-player'),
('Singleplayer'),('Solo'),('Solo RPG'),('Souls-like'),('Space'),('Space Sim'),('Spectacle fighter'),('Split Screen'),
('Spooky'),('Stealth'),('Story'),('Story Rich'),('Stylized'),('Superhero'),('Supernatural'),('Superpowers'),
('Survival'),('Survival Horror'),('Tactical'),('Tactical RPG'),('Third Person'),('Third-Person Shooter'),
('Time Management'),('Time Manipulation'),('Time Travel'),('Top-Down'),('Tower Defense'),('Turn-Based'),
('Twin Stick Shooter'),('Two Players'),('Two-player'),('Unforgiving'),('Vampire'),('Violent'),('Visual Novel'),
('Walking Simulator'),('Zombies');


-- Add Genres (minus RPG which is in tags)
INSERT INTO "glossary" ("term")
VALUES ('Action'),('Indie'),('Adventure'),('Strategy'),('Shooter'),('Casual'),('Simulation'),('Puzzle'),
('Arcade'),('Platformer'),('Racing'),('Massively Multiplayer'),('Sports'),('Fighting'),('Family'),('Board Games'),
('Educational'),('Card');