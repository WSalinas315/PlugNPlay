import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Wishlist() {
	//TODO : Will need the [store => store.userWishlist] to populate the games from the wishlist onto the tab panel
	//? Will contain data that can be used to render the information to the cards to appear on the tab section of the collections View.
	const dummyData = [
		{
			name: 'Final Fantasy X',
			year: 2001,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-159-1556729295-Bba7-column-width-inline.jpg',
		},
		{
			name: 'GTA: Vice City',
			year: 2002,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-160-1556729296-IDis-column-width-inline.jpg',
		},
		{
			name: 'Street Fighter IV',
			year: 2009,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-167-1556729300-1edW-column-width-inline.jpg',
		},
		{
			name: 'Halo 4',
			year: 2012,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-186-1556729312-ZIaP-column-width-inline.jpg',
		},
		{
			name: 'Diablo',
			year: 2012,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-188-1556729313-h0mJ-column-width-inline.jpg',
		},
		{
			name: 'Skyrim',
			year: 2011,
			url: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-192-1556729315-57Jg-column-width-inline.jpg',
		},
	];

	return (
		<ImageList cols={1} rowHeight={275}>
			{dummyData.map((item, index) => {
				return (
					<ImageListItem key={index}>
						<img src={item.url} srcSet={item.url} loading='lazy' />
						<ImageListItemBar
							title={item.name}
							subtitle={item.year}
							position='top'
						/>
					</ImageListItem>
				);
			})}
		</ImageList>
	);
}
