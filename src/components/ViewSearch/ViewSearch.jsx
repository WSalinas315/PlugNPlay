import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function ViewSearch() {

	// initialize dispatch
	const dispatch = useDispatch();
	
	// Initialize history
	const history = useHistory();

	// fetches user's played games from database
	useEffect(() => {
		dispatch({ type: 'USER/FETCH_PLAYED_LIST' });
	}, []);

	// pull played games information from the store
	const playedList = useSelector((store) => store.userLists.userPlayedList);

	return (
		<h1>SEARCH THE STUFF</h1>
	);
}
