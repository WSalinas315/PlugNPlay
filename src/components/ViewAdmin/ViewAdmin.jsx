import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Grid, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@mui/material/InputAdornment';
import HttpIcon from '@mui/icons-material/Http';
import DescriptionIcon from '@mui/icons-material/Description';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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
	const glossaryTerm = useSelector(store => store.glossary.glossaryItem[0]);

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

	const [autoTermFill, setAutoTermFill] = useState('');

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
	const handleDefinitionInput = event => setDefinitionInput(event.target.value);
	//* Saving the Image path input to State.
	const handleImagePathInput = event => {
		setImagePathInput(event.target.value);
	};
	//* This section corresponds to sending the saved state to dispatch to the database.
	const handleTermSubmit = () => {
		console.log(
			'Term / definition / image path',
			autoTermFill,
			definitionInput,
			imagePathInput
		);
		if (glossary?.some(obj => obj.term != autoTermFill)) {
			dispatch({
				type: 'GLOSSARY/SET_NEW_TERM',
				payload: {
					term: autoTermFill,
					definition: definitionInput,
					imagePath: imagePathInput,
				},
			});
			<Alert severity='success'>
				<AlertTitle> Success</AlertTitle>
				Successfully added new term to glossary! -{' '}
				<strong> Check it out</strong>
			</Alert>;
			dispatch({ type: 'GLOSSARY/FETCH' });
			setAutoTermFill('');
			setDefinitionInput('');
			setImagePathInput('');
		} else {
			console.log('Error duplicate');
			<Alert severity='Error'>
				<AlertTitle> Error</AlertTitle>
				Unable to Add a duplicate term to glossary - <strong> Try again</strong>
			</Alert>;
		}

		//* Clearing the state values after the Admin clicked on the submit button.
	};
	//* Handles the rendering of the Edit section upon clicking on the Edit Button.
	const handleEdit = () => {
		if (glossary.some(obj => obj.term == termInput)) {
			console.log('Clicked on the Edit Button');
			setAddBoolean(false);
			setEditBoolean(true);
			setViewBoolean(false);
			setDeleteBoolean(false);
		}
	};
	//* Handles the rendering of the View section upon clicking on the View Button.
	const handleView = () => {
		if (glossary.some(obj => obj.term == termInput)) {
			console.log('Clicked on the View Button');
			setAddBoolean(false);
			setEditBoolean(false);
			setViewBoolean(true);
			setDeleteBoolean(false);
		}
	};
	//* Handles the rendering of the Delete section upon clicking on the Delete Button.
	const handleDelete = () => {
		if (glossary.some(obj => obj.term == termInput)) {
			console.log('Clicked on the Delete Button');
			setAddBoolean(false);
			setEditBoolean(false);
			setViewBoolean(false);
			setDeleteBoolean(true);
			setOpen(true);
		}
	};
	//* This corresponds to the Modal, where the user confirms the deletion of the term from the database.
	const handleDeleteConfirm = () => {
		if (glossary.some(obj => obj.term == termInput)) {
			console.log('Clicked on the delete confirm button!');
			dispatch({
				type: 'GLOSSARY/DELETE_TERM',
				payload: { id: glossaryTerm.id },
			});
			setOpen(false);
			dispatch({ type: 'GLOSSARY/FETCH' });
		}
	};

	const handleCancel = () => {
		console.log('Clicked on the cancel button');
		setOpen(false);
	};
	const handleEditSubmit = () => {
		if (glossary.some(obj => obj.term == termInput)) {
			console.log('Clicked on the submit button in the Edit View');
			dispatch({
				type: 'GLOSSARY/EDIT_TERM',
				payload: {
					id: glossaryTerm.id,
					description: definitionInput,
					img_path: imagePathInput,
				},
			});
			setDefinitionInput('');
			setImagePathInput('');
		}
	};
	const SearchTermDefault = () => {
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
					<Box sx={{ margin: 2 }}>
						<Select
							onChange={handleChange}
							value={selectedTerm}
							autoWidth={true}
							sx={{ width: 200, height: 40 }}
							MenuProps={{
								style: {
									maxHeight: 400,
								},
							}}>
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
						<Grid>
							<Button
								variant='outlined'
								onClick={handleAdd}
								className={buttonStyle.addButton}>
								Add Term
							</Button>
						</Grid>
					</Grid>
				</Card>
			</Box>
		);
	};

	const AddingFields = () => {
		return (
			<Card
				sx={{
					mt: 1,
					m: 3,
					border: 'solid 1pt',
					width: 'calc(100vw-50px)',
				}}
				raised={true}>
				<Box onClick={Autofill}>
					<Typography
						variant='h5'
						backgroundColor='primary.main'
						borderRadius={2}
						color='#ffffff'
						align='center'
						mb={2}
						border='solid 1px #000000'>
						ADD NEW TERM
					</Typography>
				</Box>
				<Box>
					<FormControl sx={{ minWidth: '100%', gap: 2 }}>
						<TextField
							label='name'
							value={autoTermFill}
							onChange={handleTermInput}
							sx={{ width: '100%' }}
						/>
						<TextField
							label='Definition'
							value={definitionInput}
							onChange={handleDefinitionInput}
							sx={{ width: '100%' }}
						/>
						<TextField
							label='Image'
							value={imagePathInput}
							onChange={handleImagePathInput}
							sx={{ width: '100%' }}
						/>
						<Button variant='outlined' onClick={handleTermSubmit}>
							Submit
						</Button>
					</FormControl>
				</Box>
			</Card>
		);
	};
	const EditSubmitBtn = () => {
		return (
			<Box textAlign='center'>
				<Button
					onClick={handleEditSubmit}
					variant='contained'
					sx={{ padding: 1, height: '40px', mt: 5, mb: 2 }}>
					Submit
				</Button>
			</Box>
		);
	};

	const TermLogic = () => {
		return (
			<Box>
				<Typography>Term: {glossaryTerm.term}</Typography>
				{glossaryTerm.description ? (
					<Typography> Description: {glossaryTerm.description} </Typography>
				) : (
					<Typography>Description: No Description is Available.</Typography>
				)}
				{glossaryTerm.img_path ? (
					<img src={glossaryTerm.img_path} />
				) : (
					<Typography>NO IMAGE AVAILABLE</Typography>
				)}
			</Box>
		);
	};

	const Autofill = () => {
		setAutoTermFill('Camping');
		setDefinitionInput(
			'When a character stays in one spot — “camps out” — to gain an unfair advantage and attack other characters without being seen. '
		);
		setImagePathInput(
			'https://steamuserimages-a.akamaihd.net/ugc/595844364268868296/620B89799B9E47B034DE798060F1C5DE2C047750/?imw=1024&imh=578&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true'
		);
	};

	//! ADD TERM SECTION
	if (
		toggleAdd == true &&
		toggleEdit == false &&
		toggleView == false &&
		toggleDelete == false
	) {
		return (
			<Box>
				<SearchTermDefault />
				<AddingFields />
			</Box>
		);
	} else if (
		toggleAdd == false &&
		toggleEdit == false &&
		toggleView == true &&
		toggleDelete == false
	) {
		return (
			<>
				<SearchTermDefault />
				<Card
					sx={{ mt: 4, mb: 4, border: 'solid 1pt', width: 'calc(100vw-50px)' }}
					raised={true}>
					<TermLogic />
				</Card>
			</>
		);
		//* DISPLAY THE TERM, DESCRIPTION, AND IMAGE.
	} else if (
		toggleAdd == false &&
		toggleEdit == false &&
		toggleView == false &&
		toggleDelete == true
	) {
		return (
			<>
				<SearchTermDefault />

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
							Are you sure you want to delete "{glossaryTerm.term}" from the
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
			</>
		);
	} else if (
		toggleAdd == false &&
		toggleEdit == true &&
		toggleView == false &&
		toggleDelete == false
	) {
		return (
			<Box>
				<SearchTermDefault />
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
						<TermLogic />
						<Box
							sx={{ mt: 2 }}
							justifyItems='center'
							textAlign='center'
							key={3}>
							<TextField
								key={1}
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
								key={2}
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
						<EditSubmitBtn />
					</Card>
				</Box>
			</Box>
		);
	}
	//! DEFAULT SET UP ON INITIAL LOAD.
	else {
		return (
			<Box>
				<SearchTermDefault />
			</Box>
		);
	}
}

export default AdminPage;
