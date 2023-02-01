// store an object of questions, question captions, and tags

const surveyScaleQuestions = [
  {
    id: 1,
    question: "Would you rather control a single character/group of characters, or control a simulation?",
    caption: '',
    genres: {
      left: ['action', 'indie', 'adventure', 'rpg', 'shooter', 'platformer', 'massively-multiplayer', 'fighting'],
      right: ['strategy', 'simulation', 'puzzle', 'sports', 'board-games', 'card'],
    },
    tags: {
      left: ['rpg', ],
      right: ['base-building', 'city-builder', 'clicker', 'colony-sim', 'card-game', 'deck-building', 'tower-defense',],
    },
  },
  {
    id: 2,
    question: "Are you mainly looking for new adventures for yourself, or do you want to bring some friends along?",
    caption: "",
    genres: {
      left: [],
      right: ['massively-multiplayer', 'fighting'],
    },
    tags: {
      left: ['singleplayer', 'single-player', 'solo', 'solo-rpg'],
      right: ['multiplayer', 'two-players', 'two-player', 'battle-royale', 'pvp', 'local-co-op', 'local-multiplayer', 'local-pvp', 'split-screen'],
    },
  },
  {
    id: 3,
    question: "If and when playing with friends, would you like to cooperate toward a goal, or compete against each other?",
    caption: "",
    genres: {
      left: [],
      right: []
    },
    tags: {
      left: ['co-op', 'co-op-campaign', 'pve', 'local-co-op', 'mmo', 'mmorpg', 'online-co-op', 'online-multiplayer', ],
      right: ['pvp', 'competitive', 'battle-royale', 'local-pvp', 'moba', 'online-pvp', ],
    },
  },
  {
    id: 4,
    question: "Would you rather play something easy, or experience a challenge?",
    caption: '',
    genres: {
      left: ['casual', 'family'],
      right: ['strategy', 'rpg', 'puzzle'],
    },
    tags: {
      left: ['relaxing', 'family-friendly', 'walking-simulator', 'non-violent', 'party-game', 'feel-good'],
      right: ['souls-like', 'unforgiving', 'difficult', 'perma-death', 'roguelike', 'roguelite', 'action-roguelike'],
    },
  },
  {
    id: 5,
    question: "Do you prefer short video games over long ones?",
    caption: '',
    genres: {
      left: ['casual', 'puzzle', 'board-games', 'card'],
      right: ['adventure', 'rpg', 'massively-multiplayer'],
    },
    tags: {
      left: ['short'],
      right: ['jrpg'],
    },
  },
  {
    id: 6,
    question: 'Would you be more interested in a 2D game, or a 3D game?',
    caption: '',
    genres: {
      left: [],
      right: []
    },
    tags: {
      left: ['2D', '2D-platformer', 'side-scroller', 'side-scrolling'],
      right: ['3D'],
    },
  },
  {
    id: 7,
    question: "Which visual style is more appealing to you: a stylized, cartoony look, or a photorealistic graphical style?",
    caption: '',
    genres: {
      left: [],
      right: []
    },
    tags: {
      left: ['anime', 'manga', 'cartoon', 'stylized', 'comic-book', 'colorful', 'hand-drawn',],
      right: ['realistic', 'photorealistic', 'cinematic',],
    },
  },
  {
    id: 8,
    question: "How do you feel about games featuring low-poly, 8-bit, or old school graphics?",
    caption: '',
    genres: {
      left: [],
      right: []
    },
    tags: {
      left: ['8-bit', 'pixel-graphics', 'retro', 'demake', 'low-poly', 'old-school'],
      right: [],
    },
  },
  {
    id: 9,
    question: "Which sounds more appealing to you: a fantasy/sci-fi setting, where advanced technology or mythical creatures could play a role; or a setting in a grounded, realistic world much like our own?",
    caption: '',
    genres: {
      left: ['adventure', 'rpg', 'massively-multiplayer'],
      right: [],
    },
    tags: {
      left: ['zombies', 'western', 'vampire', 'supernatural', 'steampunk', 'space', 'space-sim', 'sci-fi', 'fantasy', 'futuristic', 'monsters',],
      right: ['modern', 'realistic', 'photorealistic'],
    },
  },
  {
    id: 10,
    question: "Would you like to feel fully immersed and involved in the game world, or would you rather observe characters/events from a distance?",
    caption: '',
    genres: {
      left: [],
      right: []
    },
    tags: {
      left: ['open-world', 'first-person', 'fps', 'atmospheric', 'sandbox', 'silent-protagonist',],
      right: ['god-game', 'third-person', 'third-person-shooter', 'rts', 'real-time-tactics', 'moba', 'base-building', 'city-builder', 'isometric', 'top-down'],
    },
  },
  {
    id: 11,
    question: "Would you feel more accomplished defeating a tough enemy, or solving a difficult puzzle?",
    caption: '',
    genres: {
      left: [ 'action', 'rpg', 'shooter', 'strategy', 'arcade', ],
      right: [ 'puzzle', 'simulation', ],
    },
    tags: {
      left: [ 'loot', 'dungeon-crawler', ],
      right: [ 'logic', 'puzzle-platformer', ],
    },
  },
  {
    id: 12,
    question: "Would you prefer a fast-paced game that rewards movement and reaction time, or a slower game that rewards planning, tactics and strategy?",
    caption: '',
    genres: {
      left: ['action', 'platformer', 'fighting', 'racing', 'shooter', 'arcade',],
      right: ['strategy','puzzle','simulation','card','board-games'],
    },
    tags: {
      left: ['action-rpg', 'bullet-hell', 'fast-paced', 'fps', 'precision-platformer', 'quick-time-events', 'music', 'rhythm', 'shoot-em-up', 'beat-em-up', 'twin-stick-shooter',],
      right: ['crpg', 'action-rts', 'rts', 'resource-management', 'turn-based',],
    },
  },
  {
    id: 13,
    question: "Which sounds more appealing: a game where you repeat activities to gain a better score or gear, or to sharpen your abilities; or a game with a structure and a definitive ending?",
    caption: '',
    genres: {
      left: ['arcade', 'massively-multiplayer', 'simulation', 'card', 'board-games'],
      right: ['indie', 'adventure', 'action', 'rpg'],
    },
    tags: {
      left: ['mmo', 'score-attack', 'roguelike', 'roguelite', 'roguevania'],
      right: ['linear', 'multiple-endings'],
    },
  },
  {
    id: 14,
    question: "Would you rather play a game where you feel powerful and have many abilities, or a game where you are weak and disempowered, and you have to beat the odds?",
    caption: '',
    genres: {
      left: ['action', 'rpg', 'arcade', 'fighting'],
      right: [],
    },
    tags: {
      left: ['beat-em-up', 'superhero', 'superpowers', 'spectacle-fighter', 'action-adventure'],
      right: ['horror', 'survival', 'survival-horror', 'difficult', 'lovecraftian', 'spooky', 'stealth', 'unforgiving',],
    },
  },
  {
    id: 15,
    question: "Would you feel more accomplished from demonstrating your practical skills (craftsmanship, puzzle solving, etc), or your heroic skills (magic, combat abilities, etc)?",
    caption: '',
    genres: {
      left: ['action', 'adventure', 'shooter',],
      right: ['simulation', 'educational', 'puzzle',],
    },
    tags: {
      left: ['rpg', 'magic', 'fantasy', 'dungeon-crawling',],
      right: ['argiculture', 'farming', 'gambling', 'management', 'resource-management', 'fishing', 'flight', 'driving', 'gardening', 'hunting', 'crafting'],
    },
  },
  {
    id: 16,
    question: "Would you feel more accomplished being the top player on a leaderboard, or finishing 100% of a game's content?",
    caption: '',
    genres: {
      left: ['action', 'arcade', 'shooter'],
      right: ['indie', 'adventure', 'rpg'],
    },
    tags: {
      left: [ 'competitive', 'pvp' ],
      right: ['mmo', 'loot', 'open-world' ],
    },
  },
  {
    id: 17,
    question: "Would you rather play a game that makes you feel relaxed and at ease, or a game that makes you feel excited and on-edge?",
    caption: '',
    genres: {
      left: ['casual', 'simulation', 'board-games', 'card'],
      right: ['action', 'shooter', 'racing', 'sports', 'fighting'],
    },
    tags: {
      left: [],
      right: ['horror', 'fps', 'action-adventure', 'fast-paced', 'bullet-hell', 'twin-stick-shooter'],
    },
  },
  {
    id: 18,
    question: "Do you find the most enjoyment in feeling unrestricted and free to explore, or in having a sense of direction?",
    caption: '',
    genres: {
      left: ['adventure', 'rpg', 'massively-multiplayer'],
      right: ['action', 'shooter', 'platformer', 'arcade', 'racing'],
    },
    tags: {
      left: ['open-world', 'immersive-sim', 'atmospheric', 'nonlinear', 'metroidvania', 'exploration'],
      right: ['linear'],
    },
  },
  {
    id: 19,
    question: "Would you like to play a game with a strong focus on story, character, and narrative?",
    caption: '',
    genres: {
      left: ['action', 'adventure', 'rpg'],
      right: []
    },
    tags: {
      left: ['emotional', 'epic', 'story', 'story-rich', 'meaningful-choices', 'choices-matter', 'choose-your-own-adventure', 'dating-sim', 'walking-simulator', 'lore-rich', 'multiple-endings', 'mystery', 'narration', 'narrative', 'point-click', 'story', 'story-rich', 'visual-novel'],
      right: [],
    },
  },
  {
    id: 20,
    question: "Would you like to play a game with an intense, dark, or otherwise serious tone?",
    caption: '',
    genres: {
      left: [],
      right: []
    },
    tags: {
      left: ['emotional', 'dark', 'dark-comedy', 'crime', 'villain-protagonist', 'drama', 'dystopian', 'noir'],
      right: [],
    },
  },
]

const surveyBooleanQuestions = [
  {
    id: 21,
    question: 'Would you prefer to avoid games with gory or very violent content?',
    caption: '',
    tags: { // applies these tag changes if user answers YES
      increase: ['family-friendly'],
      decrease: ['blood', 'gore', 'violent', 'horror']
    },
  },
  {
    id: 22,
    question: 'Would you prefer to avoid games with sexual or erotic content?',
    caption: '',
    tags: {
      increase: [],
      decrease: ['nsfw', 'nudity', 'erotic', 'sexual-content', 'dating-sim']
    },
  },
]

module.exports = { surveyScaleQuestions, surveyBooleanQuestions }