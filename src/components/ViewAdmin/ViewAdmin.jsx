import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function AdminPage() {
	const user = useSelector(store => store.user);

	if (user.access_level == 1) {
		if (prop.term == '') {
			return <h2>Please choose from Glossary to make any changes</h2>;
		} else {
			return (
				<div>
					<h1>Under Development</h1>
					<h2>Term: {prop.term}</h2>
					<p>{JSON.stringify({ user })}</p>
					<h4>
						Definition: Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Neque mollitia pariatur, id iste architecto molestias ratione ab,
						dolores dolorum reprehenderit, recusandae tenetur eum asperiores
						rerum in ad perspiciatis officiis sapiente.
					</h4>
					<Grid>
						<ButtonGroup>
							<Button sx={{ bgcolor: '#000000' }}>Edit</Button>
							<Button sx={{ bgcolor: '#000000' }}>Delete</Button>
							<Button sx={{ bgcolor: '#000000' }}>Add</Button>
						</ButtonGroup>
					</Grid>
				</div>
			);
		}
	}
}

export default AdminPage;
