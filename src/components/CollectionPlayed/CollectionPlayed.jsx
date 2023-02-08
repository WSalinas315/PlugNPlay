import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

	// initialize dispatch
	const dispatch = useDispatch();

	// fetches user's played games from database
	useEffect(() => {
		dispatch({ type: 'USER/FETCH_PLAYED_LIST' });
	}, []);

	// pull played games information from the store
	const playedList = useSelector((store) => store.userLists.userPlayedList);

	return (
		<ImageList cols={1} rowHeight={250} gap={20}>
			{playedList?.map(item => (
				<ImageListItem key={item.id}>
					<img src={item.background_image} srcSet={item.background_image} loading='lazy' />
					<ImageListItemBar
						title={item.name}
						subtitle={item.released}
						position='top'
						sx={{ margin: '10px 10px 0px 10px' }}
						actionIcon={
							<IconButton sx={{color:'#ffffff'}}>
								{item.liked == 1 ? <ThumbUpIcon /> : item.liked == -1 ? <ThumbDownIcon /> : <></>}
							</IconButton>
						}
					/>
				</ImageListItem>
			))}
		</ImageList>
	);
}
