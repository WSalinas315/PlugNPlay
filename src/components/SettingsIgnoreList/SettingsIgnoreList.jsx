import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Wishlist() {

	// initialize dispatch
	const dispatch = useDispatch();

	// fetches user's wishlist from database
	useEffect(() => {
		dispatch({ type: 'USER/FETCH_IGNORELIST' });
	}, []);

	// pull wishlist information from the store
	const ignoreList = useSelector((store) => store.userLists.userIgnorelist);

	return (
		<ImageList cols={1} rowHeight={250} gap={20}>
			{ignoreList?.map(item => (
					<ImageListItem key={item.id}>
						<img src={item.background_image} srcSet={item.background_image} loading='lazy' />
						<ImageListItemBar
							title={item.name}
							subtitle={item.released}
							position='top'
							sx={{margin:'10px 10px 0px 10px'}}
						/>
					</ImageListItem>
			))}
		</ImageList>
	);
}