import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';

function AdminPage() {
	const user = useSelector(store => store.user);

	if (user.access_level == 1) {
		<Box>
			<Autocomplete
				options={userTag}
				freeSolo //?This will allow suggestions based on input value.
				renderInput={params => <TextField {...params} label='Search Tags' />}
				onInputChange={handleChange}
			/>
		</Box>;
		if (prop.term == '') {
			return (
				<div>
					<h2>Select from drop down to see definitions.</h2>;
				</div>
			);
		}
	} else {
		return (
			<div>
				<h1>Under Development</h1>
				<h2>Term: {prop.term}</h2>
				<p>{JSON.stringify({ user })}</p>

				<h4>
					// Definition: Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Neque mollitia pariatur, id iste architecto molestias ratione
					ab, dolores dolorum reprehenderit, recusandae tenetur eum asperiores
					rerum in ad perspiciatis officiis sapiente.
				</h4>
			</div>
		);
	}
}

export default AdminPage;
