import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import CardMedia from '@mui/material/CardMedia';

function AdminPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'GLOSSARY/FETCH' });
	}, []);

	const user = useSelector(store => store.user);
	const glossary = useSelector(store => store.glossary.glossary);
	const glossaryTerm = useSelector(store => store.glossary.glossaryItem);

	const [toggleAdd, setAddBoolean] = useState(false);
	const [toggleEdit, setEditBoolean] = useState(false);
	const [toggleView, setViewBoolean] = useState(false);
	const [toggleDelete, setDeleteBoolean] = useState(false);

	const [termInput, setTermInput] = useState('');
	const [definitionInput, setDefinitionInput] = useState('');
	const [imagePathInput, setImagePathInput] = useState('');

	const handleChange = (event, value) => {
		console.log('Value is: ', value);
		dispatch({
			type: 'GLOSSARY/FETCH_TERM',
			payload: value, //This is the term that is was clicked on from the drop down menu.
		});
	};

	//This section corresponds to the Adding of a new term to DB.
	const handleAdd = () => {
		console.log('Clicked on the Add Term Button');
		setAddBoolean(true);
		setEditBoolean(false);
		setViewBoolean(false);
		setDeleteBoolean(false);
	};

	const handleTermInput = event => {
		setTermInput(event.target.value);
	};
	const handleDefinitionInput = event => {
		setDefinitionInput(event.target.value);
	};
	const handleImagePathInput = event => {
		setImagePathInput(event.target.value);
	};

	const handleTermSubmit = () => {
		console.log(
			'Term / definition / image path',
			termInput,
			definitionInput,
			imagePathInput
		);

		dispatch({
			type: 'GLOSSARY/SET_NEW_TERM',
			payload: {
				term: termInput,
				definition: definitionInput,
				imagePath: imagePathInput,
			},
		});

		setTermInput('');
		setDefinitionInput('');
		setImagePathInput('');
	};
	//End of Adding New Term to DB.

	const handleEdit = () => {
		console.log('Clicked on the Edit Button');
		setAddBoolean(false);
		setEditBoolean(true);
		setViewBoolean(false);
		setDeleteBoolean(false);
	};

	const handleView = () => {
		console.log('Clicked on the View Button');
		setAddBoolean(false);
		setEditBoolean(false);
		setViewBoolean(true);
		setDeleteBoolean(false);
	};

	const handleDelete = () => {
		console.log('Clicked on the Delete Button');
		setAddBoolean(false);
		setEditBoolean(false);
		setViewBoolean(false);
		setDeleteBoolean(true);
	};
	//! ADD TERM SECTION
	if (
		toggleAdd == true &&
		toggleEdit == false &&
		toggleView == false &&
		toggleDelete == false
	) {
		return (
			<Box
				sx={{
					m: 3,
					width: 'calc(100vw- 50px)',
				}}>
				<Card sx={{ mb: 3, border: 'solid' }}>
					<Typography> Please select a term to Modify</Typography>
					<Autocomplete
						options={glossary.map(({ term }) => term)}
						freeSolo //?This will allow suggestions based on input value.
						renderInput={params => (
							<TextField {...params} label='Search Term' />
						)}
						onInputChange={handleChange}
					/>
					<ButtonGroup sx={{ m: 2 }}>
						<Button variant='outlined' onClick={handleEdit}>
							Edit
						</Button>
						<Button variant='outlined' onClick={handleView}>
							View
						</Button>
						<Button variant='outlined' onClick={handleDelete}>
							Delete
						</Button>
					</ButtonGroup>
				</Card>

				<Grid>
					<Button variant='outlined' onClick={handleAdd}>
						Add Term
					</Button>
				</Grid>

				<Box>
					<FormControl>
						<TextField
							label='name'
							value={termInput}
							onChange={handleTermInput}
						/>
						<TextField
							label='Definition'
							value={definitionInput}
							onChange={handleDefinitionInput}
						/>
						<TextField
							label='Image'
							value={imagePathInput}
							onChange={handleImagePathInput}
						/>
						<Button variant='outlined' onClick={handleTermSubmit}>
							Submit
						</Button>
					</FormControl>

					{/* <Typography>{JSON.stringify({ termInput })} </Typography>
					<Typography>{JSON.stringify({ definitionInput })} </Typography>
					<Typography> {JSON.stringify({ imagePathInput })}</Typography> */}
				</Box>
			</Box>
		); //!END OF ADD TERM SECTION
	}
	//! START OF VIEW TERM SECTION
	else if (
		toggleAdd == false &&
		toggleEdit == false &&
		toggleView == true &&
		toggleDelete == false &&
		glossaryTerm[0].description == null &&
		glossaryTerm[0].img_path == null
	) {
		return (
			<Box
				sx={{
					m: 3,
					width: 'calc(100vw- 50px)',
				}}>
				<Card sx={{ mb: 3, border: 'solid' }}>
					<Typography> Please select a term to Modify</Typography>
					<Autocomplete
						options={glossary.map(({ term }) => term)}
						freeSolo //?This will allow suggestions based on input value.
						renderInput={params => (
							<TextField {...params} label='Search Term' />
						)}
						onInputChange={handleChange}
					/>
					<ButtonGroup sx={{ m: 2 }}>
						<Button variant='outlined' onClick={handleEdit}>
							Edit
						</Button>
						<Button variant='outlined' onClick={handleView}>
							View
						</Button>
						<Button variant='outlined' onClick={handleDelete}>
							Delete
						</Button>
					</ButtonGroup>
				</Card>

				<Grid>
					<Button variant='outlined' onClick={handleAdd}>
						Add Term
					</Button>
				</Grid>

				<Box>
					<Card>
						<Typography> Term : {glossaryTerm[0].term} </Typography>
						<Typography>Definition : No Definition Available</Typography>
						<Typography>Image : No Image Available</Typography>
					</Card>
				</Box>
			</Box>
		);
	} else if (
		toggleAdd == false &&
		toggleEdit == false &&
		toggleView == true &&
		toggleDelete == false &&
		glossaryTerm[0].description != null &&
		glossaryTerm[0].img_path == null
	) {
		return (
			<Box
				sx={{
					m: 3,
					width: 'calc(100vw- 50px)',
				}}>
				<Card sx={{ mb: 3, border: 'solid' }}>
					<Typography> Please select a term to Modify</Typography>
					<Autocomplete
						options={glossary.map(({ term }) => term)}
						freeSolo //?This will allow suggestions based on input value.
						renderInput={params => (
							<TextField {...params} label='Search Term' />
						)}
						onInputChange={handleChange}
					/>
					<ButtonGroup sx={{ m: 2 }}>
						<Button variant='outlined' onClick={handleEdit}>
							Edit
						</Button>
						<Button variant='outlined' onClick={handleView}>
							View
						</Button>
						<Button variant='outlined' onClick={handleDelete}>
							Delete
						</Button>
					</ButtonGroup>
				</Card>

				<Grid>
					<Button variant='outlined' onClick={handleAdd}>
						Add Term
					</Button>
				</Grid>

				<Box>
					<Card>
						<Typography> Term : {glossaryTerm[0].term} </Typography>
						<Typography>Definition : {glossaryTerm[0].description}</Typography>
						<Typography>Image : No Image Available</Typography>
					</Card>
				</Box>
			</Box>
		);
	} else if (
		toggleAdd == false &&
		toggleEdit == false &&
		toggleView == true &&
		toggleDelete == false &&
		glossaryTerm[0].description != null &&
		glossaryTerm[0].img_path != null
	) {
		return (
			<Box
				sx={{
					m: 3,
					width: 'calc(100vw- 50px)',
				}}>
				<Card sx={{ mb: 3, border: 'solid' }}>
					<Typography> Please select a term to Modify</Typography>
					<Autocomplete
						options={glossary.map(({ term }) => term)}
						freeSolo //?This will allow suggestions based on input value.
						renderInput={params => (
							<TextField {...params} label='Search Term' />
						)}
						onInputChange={handleChange}
					/>
					<ButtonGroup sx={{ m: 2 }}>
						<Button variant='outlined' onClick={handleEdit}>
							Edit
						</Button>
						<Button variant='outlined' onClick={handleView}>
							View
						</Button>
						<Button variant='outlined' onClick={handleDelete}>
							Delete
						</Button>
					</ButtonGroup>
				</Card>

				<Grid>
					<Button variant='outlined' onClick={handleAdd}>
						Add Term
					</Button>
				</Grid>

				<Box>
					<Card>
						<Typography> Term : {glossaryTerm[0].term} </Typography>
						<Typography>Definition : {glossaryTerm[0].description}</Typography>
						<CardMedia
							image={`{glossaryTerm[0].img_path}`}
							sx={{ maxHeight: 400, maxWidth: 300 }}
						/>
					</Card>
				</Box>
			</Box>
		);
		//!END OF VIEW TERM SECTION
	}
	//! DEFAULT SET UP ON INITIAL LOAD.
	else {
		return (
			<Box
				sx={{
					m: 3,
					width: 'calc(100vw- 50px)',
				}}>
				<Card sx={{ mb: 3, border: 'solid' }}>
					<Typography> Please select a term to Modify</Typography>
					<Autocomplete
						options={glossary.map(({ term }) => term)}
						freeSolo //?This will allow suggestions based on input value.
						renderInput={params => (
							<TextField {...params} label='Search Term' />
						)}
						onInputChange={handleChange}
					/>
					<ButtonGroup sx={{ m: 2 }}>
						<Button variant='outlined' onClick={handleEdit}>
							Edit
						</Button>
						<Button variant='outlined' onClick={handleView}>
							View
						</Button>
						<Button variant='outlined' onClick={handleDelete}>
							Delete
						</Button>
					</ButtonGroup>
				</Card>
				<Grid>
					<Button variant='outlined' onClick={handleAdd}>
						Add Term
					</Button>
				</Grid>
			</Box>
		);
	} //! END OF DEFAULT SETUP.
}

export default AdminPage;
