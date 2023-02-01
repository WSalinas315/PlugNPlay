import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Wishlist() {
	//? Will contain data that can be used to render the information to the cards to appear on the tab section of the collections View.
	const dummyData = [
		{
			name: 'Game',
			year: 1234,
			url: 'http://d205bpvrqc9yn1.cloudfront.net/0049.gif',
		},
		{
			name: 'Game',
			year: 2023,
			url: 'http://d205bpvrqc9yn1.cloudfront.net/0009.gif',
		},
		{
			name: 'Game',
			year: 2022,
			url: 'http://d205bpvrqc9yn1.cloudfront.net/0001.gif',
		},
		{
			name: 'Game',
			year: 2020,
			url: 'http://d205bpvrqc9yn1.cloudfront.net/0069.gif',
		},
	];

	return (
		<ImageList cols={1} rowHeight={275}>
			{/* <h5> 🚧🚧🚧 UNDER DEVELOPMENT 🚧🚧🚧</h5>
			<p>
				This is rendering the Wishlist component to appear in the tab section 🥹
			</p> */}
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
