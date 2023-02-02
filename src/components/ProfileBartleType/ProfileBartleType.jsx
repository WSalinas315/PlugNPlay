import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ProfileBartleType() {

  // local arrays
  let bartleScores = [
    {score: 0, type: 'Killer'},
    {score: 0, type: 'Competitor'},
    {score: 0, type: 'Collector'},
    {score: 0, type: 'Expert'},
    {score: 0, type: 'Detective'},
    {score: 0, type: 'Navigator'},
    {score: 0, type: 'Rockstar'},
    {score: 0, type: 'Coach'}
  ];
  let sortedBartles = [];

  // initialize variable from store
  const userGenres = useSelector(store => store.user_genres);

  // Initialize local state
  const [bartleType, setBartleType] = useState('');

  // calls calculatePlayerType function on page load
  useEffect(() => {
    calculatePlayerType();
  }, []);

  // Calculate player type
  const calculatePlayerType = () => {
    // add up bartle scores for each type
    bartleScores.killer.score = userGenres.shooter + userGenres.fighting + userGenres.action + userGenres.rpg;
    bartleScores.competitor.score = userGenres.sports + userGenres.racing + userGenres.arcade + userGenres.boardgames;
    bartleScores.collector.score = userGenres.platformer + userGenres.adventure + userGenres.rpg + userGenres.puzzle;
    bartleScores.expert.score = userGenres.arcade + userGenres.platformer + userGenres.simulation + userGenres.strategy;
    bartleScores.detective.score = userGenres.puzzle + userGenres.strategy + userGenres.card + userGenres.boardgames;
    bartleScores.navigator.score = userGenres.adventure + userGenres.simulation + userGenres.action + userGenres.indie;
    bartleScores.rockstar.score = userGenres.mmo + userGenres.shooter + userGenres.rpg + userGenres.adventure;
    bartleScores.coach.score = userGenres.family + userGenres.educational + userGenres.casual + userGenres.mmo;

    // sort bartleScores array by score value
    sortedBartles = bartleScores.sort((s1, s2) => (s1.score < s2.score) ? 1 : (s1.score > s2.score) ? -1 : 0);
    // set bartleType
    setBartleType(sortedBartles[0].type);
  }

  return (
  <div>
    <h3>Player Type: {bartleType}</h3>
  </div>
  )
}