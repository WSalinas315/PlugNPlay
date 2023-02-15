import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from "@mui/material";

export default function ProfileBartleType() {

  // create local objects
  let bartleScores = {
    killer: { score: 0, type: 'Killer' },
    competitor: { score: 0, type: 'Competitor' },
    collector: { score: 0, type: 'Collector' },
    expert: { score: 0, type: 'Expert' },
    detective: { score: 0, type: 'Detective' },
    navigator: { score: 0, type: 'Navigator' },
    rockstar: { score: 0, type: 'Rockstar' },
    coach: { score: 0, type: 'Coach' }
  };

  let genres = {};

  // initialize variable from store
  const userGenres = useSelector(store => store.userLists.userScores);

  // Initialize local state
  const [bartleType, setBartleType] = useState('');

  // calls calculatePlayerType function on page load
  useEffect(() => {
    filterScores(userGenres);
  }, [userGenres]);

  // pull genre names and scores out of user genre data from table and rename genres with dashes
  const filterScores = (userGenres) => {
    //console.log('USER GENRES', userGenres);
    for (let item of userGenres) {
      if (item.genre_name == "massively-multiplayer") {
        genres['mmo'] = item.score;
      } else if (item.genre_name == "board-games") {
        genres['boardgames'] = item.score;
      } else {
        genres[item.genre_name] = item.score;
      }
    }
    calculatePlayerType();
  }

  // Calculate player type
  const calculatePlayerType = () => {
    // add up bartle scores for each type
    bartleScores.killer.score = genres.shooter + genres.fighting + genres.action + genres.rpg;
    bartleScores.competitor.score = genres.sports + genres.racing + genres.arcade + genres.boardgames;
    bartleScores.collector.score = genres.platformer + genres.adventure + genres.rpg + genres.puzzle;
    bartleScores.expert.score = genres.arcade + genres.platformer + genres.simulation + genres.strategy;
    bartleScores.detective.score = genres.puzzle + genres.strategy + genres.card + genres.boardgames;
    bartleScores.navigator.score = genres.adventure + genres.simulation + genres.action + genres.indie;
    bartleScores.rockstar.score = genres.mmo + genres.shooter + genres.rpg + genres.adventure;
    bartleScores.coach.score = genres.family + genres.educational + genres.casual + genres.mmo;

    //console.log('Scores', bartleScores);

    // determine highest bartle type score
    let highestScore = { playerType: 0 };
    Object.entries(bartleScores).map(([playerType, data]) => {
      if (data.score > Object.values(highestScore)[0]) {
        highestScore = { [playerType]: data.score }
      }
    })
    const highestType = Object.keys(highestScore)[0];

    // set Bartle type
    setBartleType(bartleScores[highestType]?.type);
  }

  return (
    <div>
      <Typography className="grid-right" variant="h3">
        {bartleType ?? 'None'}
      </Typography>
    </div>
  )
}