import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

//the container for the navbar for positioning.
import Paper from '@mui/material/Paper';
//Navbar itself
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
//Icons
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

import './Nav.css';

function Nav() {
	const user = useSelector(store => store.user);

	return (
		<Paper
			sx={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 1,
				width: '100vw',
			}}>
			{user.id && (
				<BottomNavigation showLabels>
					<BottomNavigationAction
						label='Home'
						value='home'
						icon={<HomeIcon sx={{ color: '#ffffff' }} />}
						component={Link}
						to='/home'
					/>
					<BottomNavigationAction
						label='Collections'
						value='collections'
						icon={<CollectionsIcon sx={{ color: '#ffffff' }} />}
						component={Link}
						to='/collection'
					/>
					<BottomNavigationAction
						label='Search'
						value='search'
						icon={<SearchIcon sx={{ color: '#ffffff' }} />}
						component={Link}
						to='/search'
					/>
					<BottomNavigationAction
						label='Profile'
						value='profile'
						icon={<PersonIcon sx={{ color: '#ffffff' }} />}
						component={Link}
						to='/profile'
					/>
				</BottomNavigation>
			)}
		</Paper>
	);
}

export default Nav;
