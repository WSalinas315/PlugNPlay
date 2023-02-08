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
									<InfoIcon sx={{ color: '#ffffff' }} />
									<ButtonGroup sx={{ gap: 5 }}>
										<ThumbUpIcon sx={{ color: '#ffffff' }} />
										<ThumbDownIcon sx={{ color: '#ffffff' }} />
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
