import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import Card from '@mui/material/Card';
import ProfileBartleType from '../ProfileBartleType/ProfileBartleType';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import './ViewProfile.css';

import { Button, ButtonGroup, Link } from '@mui/material';
import LogOutButton from '../LogOutButton/LogOutButton'

function ViewProfile() {
	// Pull user information from store
	const user = useSelector(store => store.user);

	const history = useHistory();

	const handleAdminClick = () => {
		history.push('/admin');
	};
	if (user.access_level == 1) {
		return (
			<div>
				{/* Settings Icon */}
				<ButtonGroup>
					<Button sx={{ border: 'transparent' }}>
						<SettingsIcon
							sx={{
								color: '#C02222',
								border: 'solid 2px',
								borderRadius: '10px',
								height: '36px',
								width: '36px',
							}}
						/>
					</Button>
					<Button
						sx={{ border: 'transparent', select: '#ffffff' }}
						onClick={handleAdminClick}>
						<AdminPanelSettingsIcon
							sx={{
								color: '#C02222',
								border: 'solid 2px',
								borderRadius: '10px',
								height: '36px',
								width: '36px',
							}}
						/>
					</Button>
				</ButtonGroup>
				<br />
				<br />

				{/* Player Profile Card */}
				<Card sx={{ textAlign: 'center', border: '1px solid #C02222' }}>
					{/* Username */}
					<h1>{user.username}</h1>
					{/* Profile picture or default profile image */}
					{user.profile_img_path ? (
						<img className='profile_img' src={user.profile_img_path} />
					) : (
						<img className='profile_img' src='images/default.png' />
					)}
					{/* Games played count */}
					<h3>Played Games: 4 (Placeholder)</h3>
					{/* Wishlisted games count */}
					<h3>Games on Wishlist: 9 (Placeholder)</h3>
					{/* Bartle Player Type */}
					{/* <ProfileBartleType /> */}
					<h3>Player Type: Killer (Placeholder)</h3>
				</Card>
			</div>
		);
	} else {
		return (
			<div>
				{/* Settings Icon */}
				<SettingsIcon
					sx={{
						color: '#C02222',
						border: 'solid 2px',
						borderRadius: '10px',
						marginRight: '10px',
						height: '36px',
						width: '36px',
					}}
				/>
				<br />
				<br />

      {/* Player Profile Card */}
      <Card sx={{textAlign:'center', border: '1px solid #C02222'}}>
        {/* Username */}
        <h1>{user.username}</h1>
        {/* Profile picture or default profile image */}
        {user.profile_img_path ? <img className='profile_img' src={user.profile_img_path} /> : <img className='profile_img' src='images/default.png' />}
        {/* Games played count */}
        <h3>Played Games: 4 (Placeholder)</h3>
        {/* Wishlisted games count */}
        <h3>Games on Wishlist: 9 (Placeholder)</h3>
        {/* Bartle Player Type */}
        {/* <ProfileBartleType /> */}
        <h3>Player Type: Killer (Placeholder)</h3>
        <LogOutButton />
      </Card>
    </div>
  )
}
export default ViewProfile;
