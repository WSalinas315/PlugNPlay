export default function SurveyQuestion(props) {
  const question = (page) => {
    switch (page) {
      case 1:
        return `Would you rather control a single character/group of characters, or control a simulation?In many games you often participate as a single character, or at most, a small team. In contrast, a simulation is a game where you participate in a series of events as an abstract actor, as if you were moving pieces in a virtual board game. Perhaps you're giving orders to an army, directing the growth of a civilization, or sowing chaos in a small suburb.`
      case 2:
        return `Are you mainly looking for new adventures for yourself, or do you want to bring some friends along?
        There are plenty of offerings for most group sizes. Many games are exclusively single-player or exclusively multiplayer, but quite a few games support both modes!
        `
      case 3:
        return `If and when playing with friends, would you like to cooperate toward a goal, or compete against each other?
        Cooperative games and game modes are referred to as co-op, and sometimes as PvE (Player versus Environment). Competitive game modes are often referred to as PvP (Player versus Player).
        `
      case 4:
        return `Would you rather play something easy, or experience a challenge?
        Remember that many games have adjustable difficulty settings; don't be ashamed to adjust the difficulty to your liking.
        `
      case 5:
        return `Do you prefer short, bite-size games or long, epic adventures?
        A game is generally considered short if it can be completed under 8-10 hours. Long games can take anywhere from 30 hours to hundreds to see all of their content.
        `
      case 6:
        return `Would you be more interested in a 2D game, or a 3D game?`
      case 7:
        return `Which sounds more appealing to you: a stylized, cartoony look, or a photorealistic graphic style?`
      case 8:
        return `How do you feel about games featuring low-poly, 8-bit, or old school graphics?`
      case 9:
        return `Which sounds more appealing to you: a fantasy/sci-fi setting, where advanced technology or mythical creatures could play a role; or a setting in a grounded, realistic world much like our own?`
      case 10:
        return `Would you like to feel fully immersed and involved in the game world, or would you rather observe characters/events from a distance?`
      case 11:
        return `Would you feel more accomplished defeating a tough enemy, or solving a difficult puzzle?`
      case 12:
        return `Would you prefer a fast-paced game that rewards movement and reaction time, or a slower game that rewards planning, tactics and strategy?`
      case 13:
        return `Which sounds more appealing: a game where you repeat activities to gain a better score or gear, or to sharpen your abilities; or a game with a structure and a definitive ending?`
      case 14:
        return `Would you rather play a game where you feel powerful and have many abilities, or a game where you are weak and disempowered, and you have to beat the odds?`
      case 15:
        return `Would you feel more accomplished from demonstrating your practical skills (craftsmanship, puzzle solving, etc), or your heroic skills (magic, combat abilities, etc)?`
      case 16:
        return `Would you feel more accomplished being the top player on a leaderboard, or finishing 100% of a game's content?`
      case 17:
        return `Would you rather play a game that makes you feel relaxed and at ease, or a game that makes you feel excited and on-edge?`
      case 18:
        return `Would you prefer to avoid games with gory or very violent content?`
      case 19:
        return `Would you prefer to avoid games with sexual or erotic content?`
      case 20:
        return `Would you like to play a game with an intense, dark, or otherwise serious tone?`
      default:
        return ''
    }
  }
  return <section id="survey-question">{question(props.page)}</section>
}
