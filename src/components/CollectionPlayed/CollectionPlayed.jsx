import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
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
