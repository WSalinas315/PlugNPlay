import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

import Wishlist from '../CollectionWishlist/CollectionWishlist';
import Played from '../CollectionPlayed/CollectionPlayed';
import Glossary from '../CollectionGlossary/CollectionGlossary';

export default function Collection() {
	const [value, setValue] = React.useState('wishlist');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ m: -6 }} position='static'>
			<TabContext value={value}>
				<Box>
					<TabList
						centered
						sx={{
							background: '#C02222',
							indicatorColor: '#000000',
							position: 'fixed',
							left: 0,
							right: 0,
						}}
						onChange={handleChange}>
						<Tab label='Wishlist' value='wishlist' />
						<Tab label='Played' value='played' />
						<Tab label='Glossary' value='glossary' />
					</TabList>
				</Box>
				<TabPanel
					value='wishlist'
					sx={{
						width: 300,
						height: 600,
						position: 'fixed',
						left: 20,
						right: 20,
						top: 100,
						overflowY: 'scroll',
					}}>
					<Box>
						<Wishlist />
					</Box>
				</TabPanel>
				<TabPanel value='played'>
					<Played />
				</TabPanel>
				<TabPanel value='glossary'>
					<Glossary />
				</TabPanel>
			</TabContext>
		</Box>
	);
}
