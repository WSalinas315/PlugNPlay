import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';

import Glossary from '../CollectionGlossary/CollectionGlossary';

function AdminPage() {
	const user = useSelector(store => store.user);

	return <Glossary />;
}

export default AdminPage;
