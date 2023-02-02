import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ProfileBartleType() {

  // local object
  let bartleScores = {
    killer: {score: 0, type: 'Killer'},
    competitor: {score: 0, type: 'Competitor'},
    collector: {score: 0, type: 'Collector'},
    expert: {score: 0, type: 'Expert'},
    detective: {score: 0, type: 'Detective'},
    navigator: {score: 0, type: 'Navigator'},
    rockstar: {score: 0, type: 'Rockstar'},
    coach: {score: 0, type: 'Coach'}
  };

  // initialize variable from store
  const userGenres = useSelector(store => store.user_genres);

  // calls calculatePlayerType function on page load
  useEffect(() => {
    calculatePlayerType();
  }, []);

  // Calculate player type
  const calculatePlayerType = () => {
    bartleScores.killer.score = userGenres.shooter + userGenres.fighting + userGenres.action + userGenres.rpg;
    bartleScores.competitor.score = userGenres.sports + userGenres.racing + userGenres.arcade + userGenres.boardgames;
    bartleScores.collector.score = userGenres.platformer + userGenres.adventure + userGenres.rpg + userGenres.puzzle;
    bartleScores.expert.score = userGenres.arcade + userGenres.platformer + userGenres.simulation + userGenres.strategy;
    bartleScores.detective.score = userGenres.puzzle + userGenres.strategy + userGenres.card + userGenres.boardgames;
    bartleScores.navigator.score = userGenres.adventure + userGenres.simulation + userGenres.action + userGenres.indie;
    bartleScores.rockstar.score = userGenres.mmo + userGenres.shooter + userGenres.rpg + userGenres.adventure;
    bartleScores.coach.score = userGenres.family + userGenres.educational + userGenres.casual + userGenres.mmo;
  }

  return (
  <div>
    <h3>Player Type: {PlAyErTyPe}</h3>
  </div>
  )
}