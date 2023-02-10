import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Grid, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@mui/material/InputAdornment';
import HttpIcon from '@mui/icons-material/Http';
import DescriptionIcon from '@mui/icons-material/Description';
import Select from '@mui/material/Select';

const ButtonStyle = makeStyles({
	viewButton: {
		borderRadius: 5,
		border: '#999999',
		height: 35,
		color: '#ffffff',
		padding: '0 15px',
		backgroundColor: '#999999',
		'&:hover': {
			//you want this to be the same as the backgroundColor above
			background: '#999999',
			border: '#999999',
		},
	},
	deleteButton: {
		borderRadius: 5,
		height: 35,
		padding: '0 15px',
		backgroundColor: '#c02222',
		'&:hover': {
			background: '#C02222',
		},
		color: '#ffffff',
	},
	editButton: {
		borderRadius: 5,
		height: 35,
		padding: '0 15px',
		backgroundColor: '#c02222',
		'&:hover': {
			background: '#C02222',
		},
		color: '#ffffff',
	},
	addButton: {
		borderRadius: 5,
		height: 35,
		padding: '0 15px',
		backgroundColor: '#c02222',
		'&:hover': {
			background: '#C02222',
		},
		color: '#ffffff',
	},
	submitButton: {
		borderRadius: 5,
		height: 35,
		padding: '0 15px',
		backgroundColor: '#c02222',
		'&:hover': {
			background: '#C02222',
		},
		color: '#ffffff',
		marginTop: 20,
	},
});

function AdminPage() {
	const dispatch = useDispatch();

	const buttonStyle = ButtonStyle();

	//*This helps the Modal decide the current state of Modal open/close.
	const [open, setOpen] = useState(false);
	//*This is used for the Modal to appear
	const handleOpen = () => setOpen(true);
	//*This is used for the Modal to disappear
	const handleClose = () => setOpen(false);

	//* Fetches the list of glossary to populate to the AutoComplete component upon load.
	useEffect(() => {
		dispatch({ type: 'GLOSSARY/FETCH' });
	}, []);

	const user = useSelector(store => store.user);

	//* Holds an Array of objects from the Glossary Table in the Database.
	const glossary = useSelector(store => store.glossary.glossary);

	//* Holds an Array of 1 object that is replaced by the onChange of the AutoComplete component.
	const glossaryTerm = useSelector(store => store.glossary.glossaryItem);

	//* These are used to properly set the state of each toggle from the Admins button options. Only 1 will be set to TRUE while the rest are kept at FALSE.
	const [toggleAdd, setAddBoolean] = useState(false);
	const [toggleEdit, setEditBoolean] = useState(false);
	const [toggleView, setViewBoolean] = useState(false);
	const [toggleDelete, setDeleteBoolean] = useState(false);

	const [selectedTerm, setSelectedTerm] = useState('');

	//* These are set for the ADD TERM section when the user wants to input the new terms information to send to the database.
	const [termInput, setTermInput] = useState('');
	const [definitionInput, setDefinitionInput] = useState('');
	const [imagePathInput, setImagePathInput] = useState('');

	//* This is used in hand with the AutoComplete component to set the store.glossaryItem and hold the entire term's properties to use for other features in the Admin section.
	const handleChange = event => {
		console.log('Value is: ', event.target.value);
		setTermInput(event.target.value);
		dispatch({
			type: 'GLOSSARY/FETCH_TERM',
			payload: event.target.value, //?This is the term that is was clicked on from the drop down menu.
		});
		setSelectedTerm(event.target.value);
	};

	//*This section corresponds to the Adding of a new term to DB.
	const handleAdd = () => {
		console.log('Clicked on the Add Term Button');
		setAddBoolean(true);
		setEditBoolean(false);
		setViewBoolean(false);
		setDeleteBoolean(false);
	};
	//* Saving the name input to State.
	const handleTermInput = event => {
		setTermInput(event.target.value);
	};
	//* Saving the definition input to State.
	const handleDefinitionInput = event => {
		setDefinitionInput(event.target.value);
	};
	//* Saving the Image path input to State.
	const handleImagePathInput = event => {
		setImagePathInput(event.target.value);
	};
	//* This section corresponds to sending the saved state to dispatch to the database.
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
		//* Clearing the state values after the Admin clicked on the submit button.
		setTermInput('');
		setDefinitionInput('');
		setImagePathInput('');
	};
	//* Handles the rendering of the Edit section upon clicking on the Edit Button.
	const handleEdit = () => {
		console.log('Clicked on the Edit Button');
		setAddBoolean(false);
		setEditBoolean(true);
		setViewBoolean(false);
		setDeleteBoolean(false);
	};
	//* Handles the rendering of the View section upon clicking on the View Button.
	const handleView = () => {
		console.log('Clicked on the View Button');
		setAddBoolean(false);
		setEditBoolean(false);
		setViewBoolean(true);
		setDeleteBoolean(false);
	};
	//* Handles the rendering of the Delete section upon clicking on the Delete Button.
	const handleDelete = () => {
		console.log('Clicked on the Delete Button');
		setAddBoolean(false);
		setEditBoolean(false);
		setViewBoolean(false);
		setDeleteBoolean(true);
		setOpen(true);
	};
	//* This corresponds to the Modal, where the user confirms the deletion of the term from the database.
	const handleDeleteConfirm = () => {
		console.log('Clicked on the delete confirm button!');
		dispatch({
			type: 'GLOSSARY/DELETE_TERM',
			payload: { id: glossaryTerm[0].id },
		});
		setOpen(false);
		dispatch({ type: 'GLOSSARY/FETCH' });
		//!This is a way to clear the AutoComplete component's TextField after a term has been successfully deleted from the Database.
		window.location.reload();
	};

	const handleCancel = () => {
		console.log('Clicked on the cancel button');
		setOpen(false);
	};

	const handleEditSubmit = () => {
		console.log('Clicked on the submit button in the Edit View');

		dispatch({
			type: 'GLOSSARY/EDIT_TERM',
			payload: {
				id: glossaryTerm[0].id,
				description: definitionInput,
				img_path: imagePathInput,
			},
		});

		setDefinitionInput('');
		setImagePathInput('');
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
				<Card sx={{ mt: 10, mb: 4, border: 'solid 1pt' }} raised={true}>
					<Typography sx={{ marginLeft: 2, marginTop: 1, marginBottom: -1 }}>
						Please select a term to Modify
					</Typography>
					<Select onChange={handleChange} value={selectedTerm}>
						{glossary.map((obj, index) => {
							<MenuItem value='Select from List'>Select from List</MenuItem>;
							return (
								<MenuItem key={index} value={obj.term}>
									{obj.term}
								</MenuItem>
							);
						})}
					</Select>
					<Grid
						container
						gap={3}
						alignItems='center'
						justify-content='space-around'
						margin={2}>
						<Button
							variant='outlined'
							onClick={handleEdit}
							className={buttonStyle.editButton}>
							Edit
						</Button>
						<Button
							variant='outlined'
							onClick={handleView}
							className={buttonStyle.viewButton}>
							View
						</Button>
						<Button
							variant='outlined'
							onClick={handleDelete}
							className={buttonStyle.deleteButton}>
							Delete
						</Button>
					</Grid>
				</Card>

				<Grid>
					<Button
						variant='outlined'
						onClick={handleAdd}
						className={buttonStyle.addButton}>
						Add Term
					</Button>
				</Grid>

				<Box>
					<FormControl>
						<TextField
							label='name'
							value={termInput}
							onChange={handleTermInput}
							required
						/>
						<TextField
							label='Definition'
							value={definitionInput}
							onChange={handleDefinitionInput}
							required
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
				</Box>
			</Box>
		); //!END OF ADD TERM SECTION
	}
	//! START OF VIEW TERM SECTION
	//* DISPLAY THE TERM AND HIDING DESCRIPTION/IMAGE IF NOTHING TO SHOW.
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
				<Card sx={{ mt: 10, mb: 4, border: 'solid 1pt' }} raised={true}>
					<Typography sx={{ marginLeft: 2, marginTop: 1, marginBottom: -1 }}>
						Please select a term to Modify
					</Typography>
					<Select onChange={handleChange} value={selectedTerm}>
						{glossary.map((obj, index) => {
							<MenuItem value='Select from List'>Select from List</MenuItem>;
							return (
								<MenuItem key={index} value={obj.term}>
									{obj.term}
								</MenuItem>
							);
						})}
					</Select>
					<Grid
						container
						gap={3}
						alignItems='center'
						justify-content='space-around'
						margin={2}>
						<Button
							variant='outlined'
							onClick={handleEdit}
							className={buttonStyle.editButton}>
							Edit
						</Button>
						<Button
							variant='outlined'
							onClick={handleView}
							className={buttonStyle.viewButton}>
							View
						</Button>
						<Button
							variant='outlined'
							onClick={handleDelete}
							className={buttonStyle.deleteButton}>
							Delete
						</Button>
					</Grid>
				</Card>

				{/* <Grid>
					<Button
						variant='outlined'
						onClick={handleAdd}
						className={buttonStyle.addButton}>
						Add Term
					</Button>
				</Grid> */}

				<Card sx={{ mt: 4, mb: 4, border: 'solid 1pt' }} raised={true}>
					<Box sx={{ margin: 2 }}>
						<Typography> Term : {glossaryTerm[0].term} </Typography>
						<Typography>Definition : No Definition Available</Typography>
						<Typography>Image : No Image Available</Typography>
					</Box>
				</Card>
			</Box>
		);
		//* DISPLAY THE TERM AND DESCRIPTION, HIDING IMAGE IF NOTHING TO SHOW.
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
				<Card sx={{ mt: 10, mb: 4, border: 'solid 1pt' }} raised={true}>
					<Typography sx={{ marginLeft: 2, marginTop: 1, marginBottom: -1 }}>
						Please select a term to Modify
					</Typography>
					<Select onChange={handleChange} value={selectedTerm}>
						{glossary.map((obj, index) => {
							<MenuItem value='Select from List'>Select from List</MenuItem>;
							return (
								<MenuItem key={index} value={obj.term}>
									{obj.term}
								</MenuItem>
							);
						})}
					</Select>
					<Grid
						container
						gap={3}
						alignItems='center'
						justify-content='space-around'
						margin={2}>
						<Button
							variant='outlined'
							onClick={handleEdit}
							className={buttonStyle.editButton}>
							Edit
						</Button>
						<Button
							variant='outlined'
							onClick={handleView}
							className={buttonStyle.viewButton}>
							View
						</Button>
						<Button
							variant='outlined'
							onClick={handleDelete}
							className={buttonStyle.deleteButton}>
							Delete
						</Button>
					</Grid>
				</Card>

				<Grid>
					<Button
						variant='outlined'
						onClick={handleAdd}
						className={buttonStyle.addButton}>
						Add Term
					</Button>
				</Grid>

				<Card sx={{ mt: 4, mb: 4, border: 'solid 1pt' }} raised={true}>
					<Box>
						<Typography> Term : {glossaryTerm[0].term} </Typography>
						<Typography>Definition : {glossaryTerm[0].description}</Typography>
						<Typography>Image : No Image Available</Typography>
					</Box>
				</Card>
			</Box>
		);
		//* DISPLAY THE TERM, DESCRIPTION, AND IMAGE.
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
				<Card sx={{ mt: 10, mb: 4, border: 'solid 1pt' }} raised={true}>
					<Typography sx={{ marginLeft: 2, marginTop: 1, marginBottom: -1 }}>
						Please select a term to Modify
					</Typography>
					<Select onChange={handleChange} value={selectedTerm}>
						{glossary.map((obj, index) => {
							<MenuItem value='Select from List'>Select from List</MenuItem>;
							return (
								<MenuItem key={index} value={obj.term}>
									{obj.term}
								</MenuItem>
							);
						})}
					</Select>
					<Grid
						container
						gap={3}
						alignItems='center'
						justify-content='space-around'
						margin={2}>
						<Button
							variant='outlined'
							onClick={handleEdit}
							className={buttonStyle.editButton}>
							Edit
						</Button>
						<Button
							variant='outlined'
							onClick={handleView}
							className={buttonStyle.viewButton}>
							View
						</Button>
						<Button
							variant='outlined'
							onClick={handleDelete}
							className={buttonStyle.deleteButton}>
							Delete
						</Button>
					</Grid>
				</Card>

				<Grid>
					<Button
						variant='outlined'
						onClick={handleAdd}
						className={buttonStyle.addButton}>
						Add Term
					</Button>
				</Grid>

				<Card sx={{ mt: 4, mb: 4, border: 'solid 1pt' }} raised={true}>
					<Box sx={{ marginBottom: -1 }}>
						<Typography> Term: {glossaryTerm[0].term} </Typography>
						<Typography>Definition: {glossaryTerm[0].description}</Typography>

						<img src={glossaryTerm[0].img_path} />
					</Box>
				</Card>
			</Box>
		);
		//!END OF VIEW TERM SECTION
		//*
		//! START OF DELETE TERM SECTION
	} else if (
		toggleAdd == false &&
		toggleEdit == false &&
		toggleView == false &&
		toggleDelete == true
	) {
		return (
			<Box
				sx={{
					m: 3,
					width: 'calc(100vw- 50px)',
				}}>
				<Card sx={{ mt: 10, mb: 4, border: 'solid 1pt' }} raised={true}>
					<Typography sx={{ marginLeft: 2, marginTop: 1, marginBottom: -1 }}>
						Please select a term to Modify
					</Typography>
					<Select onChange={handleChange} value={selectedTerm}>
						{glossary.map((obj, index) => {
							<MenuItem value='Select from List'>Select from List</MenuItem>;
							return (
								<MenuItem key={index} value={obj.term}>
									{obj.term}
								</MenuItem>
							);
						})}
					</Select>
					<Grid
						container
						gap={3}
						alignItems='center'
						justify-content='space-around'
						margin={2}>
						<Button
							variant='outlined'
							onClick={handleEdit}
							className={buttonStyle.editButton}>
							Edit
						</Button>
						<Button
							variant='outlined'
							onClick={handleView}
							className={buttonStyle.viewButton}>
							View
						</Button>
						<Button
							variant='outlined'
							onClick={handleDelete}
							className={buttonStyle.deleteButton}>
							Delete
						</Button>
					</Grid>
				</Card>

				<Grid>
					<Button
						variant='outlined'
						onClick={handleAdd}
						className={buttonStyle.addButton}>
						Add Term
					</Button>
				</Grid>

				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-title'
					aria-activedescendant='modal-description'
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column',
							position: 'fixed',
							top: '40%',
							border: '2px solid #000000',
							bgcolor: '#ffffff',
							padding: 2,
						}}>
						<Box sx={{ borderBottom: 'solid 1px #C02222' }}>
							<Typography id='modal-title' variant='h5' component='h3'>
								Confirm Delete
							</Typography>
						</Box>
						<Typography id='modal-description' sx={{ m: 2 }}>
							Are you sure you want to delete "{glossaryTerm[0].term}" from the
							glossary?
						</Typography>
						<Grid container gap={4} alignItems='center' justifyContent='center'>
							<Button
								onClick={handleCancel}
								variant='contained'
								className={buttonStyle.viewButton}>
								Cancel
							</Button>
							<Button
								onClick={handleDeleteConfirm}
								variant='contained'
								className={buttonStyle.deleteButton}>
								Delete
							</Button>
						</Grid>
					</Box>
				</Modal>
			</Box>
		); //!END OF DELETE TERM SECTION

		//! START OF EDIT TERM SECTION
	} else if (
		toggleAdd == false &&
		toggleEdit == true &&
		toggleView == false &&
		toggleDelete == false &&
		glossaryTerm[0].img_path == null &&
		glossaryTerm[0].description == null
	) {
		return (
			<Box
				sx={{
					m: 3,
					width: 'calc(100vw- 50px)',
				}}>
				<Card sx={{ mt: 10, mb: 4, border: 'solid 1pt' }} raised={true}>
					<Grid>
						<Typography sx={{ marginLeft: 2, marginTop: 1, marginBottom: -1 }}>
							Please select a term to Modify
						</Typography>
					</Grid>
					<Select onChange={handleChange} value={selectedTerm}>
						{glossary.map((obj, index) => {
							<MenuItem value='Select from List'>Select from List</MenuItem>;
							return (
								<MenuItem key={index} value={obj.term}>
									{obj.term}
								</MenuItem>
							);
						})}
					</Select>
					<Grid
						container
						gap={3}
						alignItems='center'
						justify-content='space-around'
						margin={2}>
						<Button
							variant='outlined'
							onClick={handleEdit}
							className={buttonStyle.editButton}>
							Edit
						</Button>
						<Button
							variant='outlined'
							onClick={handleView}
							className={buttonStyle.viewButton}>
							View
						</Button>
						<Button
							variant='outlined'
							onClick={handleDelete}
							className={buttonStyle.deleteButton}>
							Delete
						</Button>
					</Grid>
				</Card>
				<Grid>
					{/* <Button
						variant='outlined'
						onClick={handleAdd}
						className={buttonStyle.addButton}>
						Add Term
					</Button> */}
				</Grid>

				<Box>
					<Card sx={{ mt: 4, border: 'solid 1pt', padding: 3 }} raised={true}>
						<Typography
							variant='h5'
							backgroundColor='primary.main'
							borderRadius={2}
							color='#ffffff'
							align='center'
							mb={2}
							border='solid 1px #000000'>
							EDITING
						</Typography>
						<Typography>Term: {glossaryTerm[0].term}</Typography>
						<Typography>
							Description: No Description is Available at this time.
						</Typography>
						<Typography>Image: No Image Available</Typography>
						<Box sx={{ mt: 2 }} justifyItems='center' textAlign='center'>
							<TextField
								label='Description'
								value={definitionInput}
								multiline
								maxRows={4}
								onChange={handleDefinitionInput}
								sx={{ width: '100%', mb: 2 }}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<DescriptionIcon />
										</InputAdornment>
									),
								}}
							/>
							<TextField
								label='Image Url'
								value={imagePathInput}
								onChange={handleImagePathInput}
								sx={{ width: '100%' }}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<HttpIcon />
										</InputAdornment>
									),
								}}
							/>
						</Box>

						<Box textAlign='center'>
							<Button
								onClick={handleEditSubmit}
								variant='contained'
								className={buttonStyle.submitButton}>
								Submit
							</Button>
						</Box>
					</Card>
				</Box>
			</Box>
		);
	} else if (
		toggleAdd == false &&
		toggleEdit == true &&
		toggleView == false &&
		toggleDelete == false &&
		glossaryTerm[0].img_path != null
	) {
		return (
			<Box
				sx={{
					m: 3,
					width: 'calc(100vw- 50px)',
				}}
				scrollable>
				<Card sx={{ mt: 10, mb: 4, border: 'solid 1pt' }} raised={true}>
					<Typography sx={{ marginLeft: 2, marginTop: 1, marginBottom: -1 }}>
						Please select a term to Modify
					</Typography>
					<Select onChange={handleChange} value={selectedTerm}>
						{glossary.map((obj, index) => {
							<MenuItem value='Select from List'>Select from List</MenuItem>;
							return (
								<MenuItem key={index} value={obj.term}>
									{obj.term}
								</MenuItem>
							);
						})}
					</Select>
					<Grid
						container
						gap={3}
						alignItems='center'
						justify-content='space-around'
						margin={2}>
						<Button
							variant='outlined'
							onClick={handleEdit}
							className={buttonStyle.editButton}>
							Edit
						</Button>
						<Button
							variant='outlined'
							onClick={handleView}
							className={buttonStyle.viewButton}>
							View
						</Button>
						<Button
							variant='outlined'
							onClick={handleDelete}
							className={buttonStyle.deleteButton}>
							Delete
						</Button>
					</Grid>
				</Card>
				<Grid>
					<Button
						variant='outlined'
						onClick={handleAdd}
						className={buttonStyle.addButton}>
						Add Term
					</Button>
				</Grid>

				<Box>
					<Card sx={{ mt: 4, border: 'solid 1pt', padding: 3 }} raised={true}>
						<Typography
							variant='h5'
							backgroundColor='primary.main'
							borderRadius={2}
							color='#ffffff'
							align='center'
							mb={2}
							border='solid 1px #000000'>
							EDITING
						</Typography>
						<Typography>Term: {glossaryTerm[0].term}</Typography>
						<Typography>Description: {glossaryTerm[0].description}</Typography>
						<CardMedia
							component='img'
							image={glossaryTerm[0].img_path}
							sx={{ maxHeight: 400, maxWidth: 300 }}
						/>

						<Box sx={{ mt: 2 }} justifyItems='center' textAlign='center'>
							<TextField
								label='Description'
								value={definitionInput}
								multiline
								maxRows={4}
								onChange={handleDefinitionInput}
								sx={{ width: '100%', mb: 2 }}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<DescriptionIcon />
										</InputAdornment>
									),
								}}
							/>
							<TextField
								label='Image Url'
								value={imagePathInput}
								onChange={handleImagePathInput}
								sx={{ width: '100%' }}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<HttpIcon />
										</InputAdornment>
									),
								}}
							/>
						</Box>

						<Box textAlign='center'>
							<Button
								onClick={handleEditSubmit}
								variant='contained'
								sx={{ padding: 1, height: '40px', mt: 5, mb: 2 }}>
								Submit
							</Button>
						</Box>
					</Card>
				</Box>
			</Box>
		);
	}
	//! DEFAULT SET UP ON INITIAL LOAD.
	else {
		return (
			<Box
				sx={{
					m: 3,
					width: 'calc(100vw- 50px)',
				}}>
				<Card sx={{ mt: 10, mb: 4, border: 'solid 1pt' }} raised={true}>
					<Typography sx={{ marginLeft: 2, marginTop: 1, marginBottom: -1 }}>
						Please select a term to Modify
					</Typography>
					<Box>
						<Select onChange={handleChange} value={selectedTerm}>
							{glossary.map((obj, index) => {
								<MenuItem value='Select from List'>Select from List</MenuItem>;
								return (
									<MenuItem key={index} value={obj.term}>
										{obj.term}
									</MenuItem>
								);
							})}
						</Select>
					</Box>

					<Grid
						container
						gap={3}
						alignItems='center'
						justify-content='space-around'
						margin={2}>
						<Button
							variant='outlined'
							onClick={handleEdit}
							className={buttonStyle.editButton}>
							Edit
						</Button>
						<Button
							variant='outlined'
							onClick={handleView}
							className={buttonStyle.viewButton}>
							View
						</Button>
						<Button
							variant='outlined'
							onClick={handleDelete}
							className={buttonStyle.deleteButton}>
							Delete
						</Button>
					</Grid>
				</Card>
				<Grid>
					<Button
						variant='outlined'
						onClick={handleAdd}
						className={buttonStyle.addButton}>
						Add Term
					</Button>
				</Grid>
			</Box>
		);
	} //! END OF DEFAULT SETUP.
}

export default AdminPage;
