import * as React from 'react';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
export default function Glossary() {
	return (
		<Paper>
			<Grid>
				<Box>
					<TabList
						sx={{
							background: '#C02222',
							indicatorColor: '#000000',
						}}>
						<Tab label='A' value='a' />
					</TabList>
				</Box>

				<Link>B</Link>
				<Link>C</Link>
				<Link>D</Link>
				<Link>E</Link>
				<Link>F</Link>
				<Link>G</Link>
				<Link>H</Link>
				<Link>I</Link>
				<Link>J</Link>
				<Link>K</Link>
				<Link>L</Link>
				<Link>M</Link>
				<Link>N</Link>
				<Link>O</Link>
				<Link>P</Link>
				<Link>Q</Link>
				<Link>R</Link>
				<Link>S</Link>
				<Link>T</Link>
				<Link>U</Link>
				<Link>V</Link>
				<Link>W</Link>
				<Link>X</Link>
				<Link>Y</Link>
				<Link>Z</Link>
			</Grid>
		</Paper>
	);
}
