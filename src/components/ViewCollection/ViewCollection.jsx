import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

export default function Collection() {
	const [value, setValue] = React.useState('wishlist');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ m: -1 }}>
			<TabContext value={value}>
				<Box>
					<TabList
						centered
						sx={{ background: '#C02222', indicatorColor: '#000000' }}
						onChange={handleChange}>
						<Tab label='Wishlist' value='wishlist' />
						<Tab label='History' value='history' />
						<Tab label='Glossary' value='glossary' />
					</TabList>
				</Box>
				<TabPanel value='wishlist'>Wishlist section</TabPanel>
				<TabPanel value='history'>History section</TabPanel>
				<TabPanel value='glossary'>Glossary section</TabPanel>
			</TabContext>
		</Box>
	);
}
