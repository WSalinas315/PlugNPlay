import React from 'react';
import { useSelector } from 'react-redux';

export default function GlossaryItem(prop) {
	//TODO Get the store

	const user = useSelector(store => store.user);

	const glossary = useSelector(store => store.glossary.glossary);

	const term = glossary.filter(object => object.term == prop.term);

	return (
		<div>
			<h1>
				Term: {prop.term} | id: {term[0].id}
			</h1>
			<h2> Definition: {term[0].description}</h2>
			<h3> Image Path: {term[0].img_path}</h3>
			{JSON.stringify(term[0])}
		</div>
	);
} // end function
