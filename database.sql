
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
 	"score" 	float NOT NULL,
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

CREATE TABLE "survey_questions" (
	"id" 			serial NOT NULL,
	"question" 		varchar(255) NOT NULL,
	"caption"		varchar(500),
	"label_left" 	varchar(30) NOT NULL,
	"label_right" 	varchar(30) NOT NULL,
	"genres_left" 	varchar(40)[],
	"genres_right"  varchar(40)[],
	"tags_left" 	varchar(40)[],
	"tags_right" 	varchar(40)[],
	"img_path" 		varchar(80),
	CONSTRAINT "survey_questions_pk" PRIMARY KEY ("id")
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

-- Survey questions, captions, answer labels, and associated tags
INSERT INTO "survey_questions"
	("question", "caption", "label_left", "label_right", "genres_left", "genres_right", "tags_left", "tags_right")
	VALUES
	-- question 1:
	('Would you rather control a single character/group of characters, or control a simulation?',
	'In many games, you participate as a single character, or at most, a small team. In contrast, there are games where you a play as an abstract actor, as if you were moving pieces in a virtual board game. Perhaps you''re giving orders to an army, directing the growth of a civilization, or sowing chaos in a small suburb.',
	'Characters',
	'Simulations',
	ARRAY['action', 'indie', 'adventure', 'rpg', 'shooter', 'platformer', 'massively-multiplayer', 'fighting'],
	ARRAY['strategy', 'simulation', 'puzzle', 'sports', 'board-games', 'card'],
	ARRAY['rpg'],
	ARRAY['base-building', 'city-builder', 'clicker', 'colony-sim', 'card-game', 'deck-building', 'tower-defense']),

	-- question 2:
	('Are you mainly looking for new adventures for yourself, or do you want to bring some friends along?',
	'There are plenty of offerings for most group sizes. Many games are exclusively single-player or exclusively multiplayer, but quite a few games support both modes!',
	'Playing solo',
	'Bringing friends',
	ARRAY[]::text[],
	ARRAY['massively-multiplayer', 'fighting'],
	ARRAY['singleplayer', 'single-player', 'solo', 'solo-rpg'],
	ARRAY['multiplayer', 'two-players', 'two-player', 'battle-royale', 'pvp', 'local-co-op', 'local-multiplayer', 'local-pvp', 'split-screen']
	),
	
	-- question 3:
	('If and when playing with friends, would you like to cooperate toward a goal, or compete against each other?',
	'Cooperative games and game modes are referred to as co-op, and sometimes as PvE (Player versus Environment). Competitive game modes are often referred to as PvP (Player versus Player).',
	'I like cooperation',
	'I play to win',
	ARRAY[]::text[],
	ARRAY[]::text[],
	ARRAY['co-op', 'co-op-campaign', 'pve', 'local-co-op', 'mmo', 'mmorpg', 'online-co-op', 'online-multiplayer'],
	ARRAY['pvp', 'competitive', 'battle-royale', 'local-pvp', 'moba', 'online-pvp']
	),
	
	-- question 4:
	('Would you rather play something easy, or experience a challenge?',
	'Keep in mind that many games have adjustable difficulty settings; don''t be ashamed to adjust the difficulty to your liking.',
	'Easy',
	'Challenge',
	array['casual', 'family'],
	array['strategy', 'puzzle'],
	array['relaxing', 'family-friendly', 'walking-simulator', 'non-violent', 'party-game', 'feel-good'],
	array['souls-like', 'unforgiving', 'difficult', 'perma-death', 'roguelike', 'roguelite', 'action-roguelike']),
	
	-- question 5:
	('Do you prefer short video games over long ones?',
	'A game is generally considered short if it can be completed under 8-10 hours. Long games can take anywhere from 30 hours to hundreds to see all of their content.',
	'Short',
	'Long',
	array['casual', 'puzzle', 'board-games', 'card'],
	array['adventure', 'rpg', 'massively-multiplayer'],
	array['short'],
	array['jrpg']),
	
	-- question 6:
	('Would you like to play a game with a stylized, cartoony, or animated graphical style?',
	'As technology grows more powerful, modern games have begun to look very close to real life. Still, many games opt for a unique visual look, such as striking comic-book animation, or pixelated styles hearkening back to the early days of video games.',
	'Stylized graphics',
	'Realistic graphics',
	array[]::text[],
	array[]::text[],
	array['anime', 'manga', 'cartoon', 'stylized', 'comic-book', 'colorful', 'hand-drawn', '8-bit', 'pixel-graphics', 'retro', 'demake', 'low-poly', 'old-school'],
	array[]::text[]),
	
	-- question 7:
	('Which sounds more appealing to you: a fantasy/sci-fi setting, where advanced technology or mythical creatures could play a role; or a setting in a grounded, realistic world much like our own?',
	'Keep in mind that even games set in a fantastical world can tell stories that are touching and human.',
	'Fantasy setting',
	'Realistic setting',
	array['adventure', 'rpg', 'massively-multiplayer'],
	array[]::text[],
	array['zombies', 'western', 'vampire', 'supernatural', 'steampunk', 'space', 'space-sim', 'sci-fi', 'fantasy', 'futuristic', 'monsters'],
	array[]::text[]),
	
	-- question 8:
	('Would you like to feel fully immersed and involved in the game world, or would you rather observe characters/events from a distance?',
	'"Immersion" is one of the most difficult game terms to define. In short, some games strive to really place you in the main character''s shoes, and to create a game world that feels wondrous and alive. Others let you take more of a bird''s eye view of events, or place some distance between the player and the world.',
	'Immerse me in the world',
	'I''d like some distance',
	array[]::text[],
	array[]::text[],
	array['open-world', 'first-person', 'fps', 'atmospheric', 'sandbox', 'silent-protagonist'],
	array['god-game', 'rts', 'real-time-tactics', 'moba', 'base-building', 'city-builder', 'isometric', 'top-down']),
	
	-- question 9:
	('Would you prefer an exciting, fast-paced game that rewards movement and reaction time, or a slower, more thoughtful game that rewards planning, tactics and strategy?',
	'Fast-paced games would include first-person shooters, platformers, and racing games; slower-paced games would include strategy games, and games with turn-based combat (where you take turns with the computer-controlled enemy team).',
	'Fast-paced',
	'Slow-paced',
	array['action', 'platformer', 'fighting', 'racing', 'shooter', 'arcade', 'sports'],
	array['strategy','puzzle','simulation','card','board-games'],
	array['action-rpg', 'bullet-hell', 'fast-paced', 'fps', 'precision-platformer', 'quick-time-events', 'music', 'rhythm', 'shoot-em-up', 'beat-em-up', 'twin-stick-shooter','horror', 'survival', 'action-adventure'],
	array['crpg', 'action-rts', 'rts', 'resource-management', 'turn-based']),
	
	-- question 10:
	
	('Which sounds more appealing: a game where you repeat activities to gain better scores, gear, and abilities; or a game with a structure and a definitive ending?',
	'Many games follow a story with an explicit conclusion, or have a certain number of levels to clear. But other games don''t have a set ending point; you can continue playing and repeating activities until you''ve mastered them, or until you''ve had your fill.',
	'I want to hone my skills',
	'I want an ending',
	array['arcade', 'massively-multiplayer', 'simulation', 'card', 'board-games'],
	array['indie', 'adventure', 'action', 'rpg'],
	array['mmo', 'score-attack', 'roguelike', 'roguelite', 'roguevania'],
	array['linear', 'multiple-endings']),
	
	-- question 11:
	('Would you rather play a game where you feel powerful and have many abilities, or a game where you are weak and disempowered, and you have to beat the odds?',
	'Some players find a lot of enjoyment in satisfying combat, fluid movement, and playing a character that has a fighting chance against anything they encounter. Others prefer to have the deck stacked against them by playing a weak character, or playing against overwhelming odds, and persisting until they overcome them.',
	'I want to feel powerful',
	'I want to beat the odds',
	array['action', 'rpg', 'arcade', 'fighting'],
	array[]::text[],
	array['beat-em-up', 'superhero', 'superpowers', 'spectacle-fighter', 'action-adventure'],
	array['horror', 'survival', 'survival-horror', 'difficult', 'lovecraftian', 'spooky', 'stealth', 'unforgiving']),
	
	-- question 12:
	('Would you feel more accomplished from demonstrating your practical skills (craftsmanship, puzzle solving, etc), or your heroic skills (magic, combat abilities, etc)?',
	'It''s not all valiant knights and space wizards! There are games that let you manage a farm, run a business, power wash dirty objects, drive a delivery truck, and much more.',
	'Practical skills',
	'Heroic skills',
	array['simulation', 'educational', 'puzzle'],
	array['action', 'adventure', 'rpg', 'shooter', 'strategy', 'arcade'],
	array['argiculture', 'farming', 'gambling', 'management', 'resource-management', 'fishing', 'flight', 'driving', 'gardening', 'hunting', 'crafting', 'logic', 'puzzle-platformer'],
	array['rpg', 'magic', 'fantasy', 'loot', 'dungeon-crawler']),
	
	-- question 13:
	('Do you find the most enjoyment in feeling unrestricted and free to explore, or in having a sense of direction?',
	'Open world games allow the player access to a wide-open world, with little to no hand-holding or mandatory waypoints. These games can be very immersive, and allow the player a lot of freedom, but can sometimes lack the focus and the hand-crafted feeling of games that are divided into levels or linear experiences.',
	'Give me full freedom',
	'Give me a focused experience',
	array['adventure', 'rpg', 'massively-multiplayer'],
	array['action', 'shooter', 'platformer', 'arcade', 'racing'],
	array['open-world', 'immersive-sim', 'atmospheric', 'nonlinear', 'metroidvania', 'exploration'],
	array['linear']),
	
	-- question 14:
	('Would you like to play a game with a strong focus on story, character, and narrative?',
	'Video games have grown immensely over the past thirty years, and now rival books, movies, theater, and television in their ability to tell a compelling narrative. If you love a good story or endearing characters, there is something out there for you.',
	'I want a powerful story',
	'I don''t care about story',
	array['adventure', 'rpg'],
	array[]::text[],
	array['emotional', 'epic', 'story', 'story-rich', 'meaningful-choices', 'choices-matter', 'choose-your-own-adventure', 'dating-sim', 'walking-simulator', 'lore-rich', 'multiple-endings', 'mystery', 'narration', 'narrative', 'point-click', 'story', 'story-rich'],
	array[]::text[]),
	
	-- question 15:
	('Would you like to play a game with an intense, dark, or otherwise serious tone?',
	'The narrative tone of games can vary immensely, and the subject matter of some games can skew distinctly macabre. These games can be very compelling and thought-provoking, but can also be a huge bummer.',
	'I like dark stories',
	'I''d rather have a good time',
	array[]::text[],
	array[]::text[],
	array['emotional', 'dark', 'dark-comedy', 'crime', 'villain-protagonist', 'drama', 'dystopian', 'noir', 'horror'],
	array[]::text[]),
	
	-- question 16:
	('Would you prefer to avoid games with gory or very violent content?',
	'',
	'Yes',
	'No',
	array[]::text[],
	array[]::text[],
	array['family-friendly'],
	array['blood', 'gore', 'violent', 'horror']),
	
	-- question 17:
	('Would you prefer to avoid games with sexual or erotic content?',
	'',
	'Yes',
	'No',
	array[]::text[],
	array[]::text[],
	array[]::text[],
	array['nsfw', 'nudity', 'erotic', 'sexual-content', 'dating-sim'])
;