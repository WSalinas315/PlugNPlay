import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function GlossaryItem(prop) {
	//TODO Get the store

	if (prop.term == '') {
		return <h2>Select from drop down to see definitions.</h2>;
	} else {
		return (
			<div>
				<h1>Under Development</h1>
				<h2>{prop.term}</h2>
				<h4>Definition will go here based on what is saved in the DB.</h4>
			</div>
		);
	}
} // end function
