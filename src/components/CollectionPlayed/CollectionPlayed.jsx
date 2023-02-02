import * as React from 'react';

import Paper from '@mui/material/Paper';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { ButtonGroup, CardActions } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function Played() {
	const dummyData = [
		{
			name: 'Final Fantasy X',
			year: 2001,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-159-1556729295-Bba7-column-width-inline.jpg',
			info: 'Saving the world from Destruction',
			detail:
				'FINAL FANTASY X tells the story of a star blitzball player, Tidus, who journeys with a young and beautiful summoner named Yuna on her quest to save the world of Spira from an endless cycle of destruction wrought by the colossal menace Sin',
			platform: 'Playstation',
		},
		{
			name: 'GTA: Vice City',
			year: 2002,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-160-1556729296-IDis-column-width-inline.jpg',
			info: 'Open World action video game, with missions and side quests',
			detail:
				'Vice City is an action-adventure game played from a third-person perspective. The player controls criminal Tommy Vercetti and completes missions—linear scenarios with set objectives—to progress through the story',
			platform: 'PS2',
		},
		{
			name: 'Street Fighter IV',
			year: 2009,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-167-1556729300-1edW-column-width-inline.jpg',
			info: 'Able to play with other players using various characters using different fighting styles.',
			detail:
				"Street Fighter® IV brings the legendary fighting series back to its roots by taking the beloved fighting moves and techniques of the original Street Fighter® II, and infusing them with Capcom's latest advancements in next generation technology",
			platform: 'PS2',
		},
		{
			name: 'Halo 4',
			year: 2012,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-186-1556729312-ZIaP-column-width-inline.jpg',
			info: 'Fighting through various obstacles',
			detail:
				"Halo 4's story follows a cybernetically enhanced human supersoldier, Master Chief, and his artificial intelligence construct Cortana, as they encounter unknown threats while exploring an ancient civilization's planet",
			platform: 'Xbox',
		},
		{
			name: 'Diablo',
			year: 2012,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-188-1556729313-h0mJ-column-width-inline.jpg',
			info: 'Storyline',
			detail:
				'This is a story about a deeply disturbed civil war veteran and mass murderer searching for a woman that he kidnapped to be his wife. She was rescued by her brothers and husband. During his search we see him as a split personality, one, the sad war veteran, and the other, the evil mass murderer.',
			platform: 'PC, Playstation',
		},
		{
			name: 'Skyrim',
			year: 2011,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-192-1556729315-57Jg-column-width-inline.jpg',
			info: 'Open world of large proportion',
			detail:
				'Skyrim is an action role-playing game, playable from either a first- or third-person perspective. The player may freely roam over the land of Skyrim, an open world environment consisting of wilderness expanses, dungeons, caves, cities, towns, fortresses, and villages',
			platform: 'PC, Playstation, Xbox',
		},
	];

	return (
		<Grid>
			{dummyData.map((game, index) => {
				return (
					<Card key={index}>
						<CardMedia height='600' width='calc(100% - 100px)'>
							<img src={game.url} srcSet={game.url} loading='lazy' />
						</CardMedia>
						<CardContent
							sx={{
								background: '#b7bdb9',
								m: -2,
							}}>
							<Typography>Name: {game.name}</Typography>
							<Typography>Year: {game.year}</Typography>
							<Typography>Info: {game.info}</Typography>
							{/* <Typography>detail: {game.detail}</Typography> */}
							<Typography>Platform: {game.platform}</Typography>
							<CardActions>
								<ButtonGroup sx={{ gap: 18 }}>
									<InfoIcon />
									<ButtonGroup sx={{ gap: 5 }}>
										<ThumbUpIcon />
										<ThumbDownIcon />
									</ButtonGroup>
								</ButtonGroup>
							</CardActions>
						</CardContent>
					</Card>
				);
			})}
		</Grid>
	);
}
