import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Popover from '@mui/material/Popover';

export default function GlossaryItem(prop) {
	//TODO Get the store

	const user = useSelector(store => store.user);

	const glossary = useSelector(store => store.glossary.glossary);

	// if (user.access_level == 0) {
	// 	if (prop.term == '') {
	// 		return (
	// 			<div>
	// 				<h2>Select from drop down to see definitions.</h2>;
	// 			</div>
	// 		);
	// 	}
	// } else {
	// 	return (
	// 		<div>
	// 			<h1>Under Development</h1>
	// 			<h2>Term: {prop.term}</h2>
	// 			<p>{JSON.stringify({ user })}</p>

	// 			<h4>
	// 				// Definition: Lorem ipsum dolor sit amet consectetur adipisicing
	// 				elit. Neque mollitia pariatur, id iste architecto molestias ratione
	// 				ab, dolores dolorum reprehenderit, recusandae tenetur eum asperiores
	// 				rerum in ad perspiciatis officiis sapiente.
	// 			</h4>
	// 		</div>
	// 	);
	// }

	return null;
} // end function
