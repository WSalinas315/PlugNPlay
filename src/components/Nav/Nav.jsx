import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
	const dispatch = useDispatch();

	return (
		<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
			{!user.id && (
				<BottomNavigation showLabels>
					<BottomNavigationAction
						label='Home'
						value='Home'
						icon={<HomeIcon />}
						component={Link}
						to='/login'
					/>
				</BottomNavigation>
			)}
			{user.id && (
				<BottomNavigation showLabels>
					<BottomNavigationAction
						label='Home'
						value='home'
						icon={<HomeIcon />}
						component={Link}
						to='/home'
					/>
					<BottomNavigationAction
						label='Collections'
						value='collections'
						icon={<CollectionsIcon />}
						component={Link}
						to='/collections'
					/>
					<BottomNavigationAction
						label='Search'
						value='search'
						icon={<SearchIcon />}
						component={Link}
						to='/search'
					/>
					<BottomNavigationAction
						label='Profile'
						value='profile'
						icon={<PersonIcon />}
						component={Link}
						to='/profile'
					/>
					//! Need to figure out this onChange with Material Mui.
					{/* <BottomNavigationAction
label='Logout'
							onChange={() => dispatch({ type: 'LOGOUT' })}>
/> */}
				</BottomNavigation>
			)}
		</Paper>
	);
}

export default Nav;
