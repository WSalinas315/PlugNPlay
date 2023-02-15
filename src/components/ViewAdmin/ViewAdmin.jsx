import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import InputAdornment from "@mui/material/InputAdornment";
import HttpIcon from "@mui/icons-material/Http";
import DescriptionIcon from "@mui/icons-material/Description";
import Select from "@mui/material/Select";

import { makeStyles } from "@material-ui/core/styles";

import Heading3 from "../Headings/Heading3";
import Heading1 from "../Headings/Heading1";

const ButtonStyle = makeStyles({
	viewButton: {
		borderRadius: 5,
		border: "#999999",
		height: 35,
		color: "#ffffff",
		padding: "0 15px",
		backgroundColor: "#999999",
		"&:hover": {
			//you want this to be the same as the backgroundColor above
			background: "#999999",
			border: "#999999",
		},
	},
	deleteButton: {
		borderRadius: 5,
		height: 35,
		padding: "0 15px",
		backgroundColor: "#c02222",
		"&:hover": {
			background: "#C02222",
		},
		color: "#ffffff",
	},
	editButton: {
		borderRadius: 5,
		height: 35,
		padding: "0 15px",
		backgroundColor: "#c02222",
		"&:hover": {
			background: "#C02222",
		},
		color: "#ffffff",
	},
	addButton: {
		borderRadius: 5,
		height: 35,
		padding: "0 15px",
		backgroundColor: "#c02222",
		"&:hover": {
			background: "#C02222",
		},
		color: "#ffffff",
	},
	submitButton: {
		borderRadius: 5,
		height: 35,
		padding: "0 15px",
		backgroundColor: "#c02222",
		"&:hover": {
			background: "#C02222",
		},
		color: "#ffffff",
		marginTop: 20,
	},
});

function AdminPage() {
	const dispatch = useDispatch();
	// imports the styling to the corresponding buttons.
	const buttonStyle = ButtonStyle();

	// This toggles the Modal when prompted.
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// Brings in the glossary terms to be displayed before DOM renders.
	useEffect(() => {
		dispatch({ type: "GLOSSARY/FETCH" });
	}, []);

	// Contains all the glossary terms from the database.
	const glossary = useSelector(store => store.glossary.glossary);

	// contains a single terms content on which is being modified
	const glossaryTerm = useSelector(store => store.glossary.glossaryItem[0]);

	// Will toggle between Admin tools to render the appropriate component to the DOM.
	const [toggleAdd, setAddBoolean] = useState(false);
	const [toggleEdit, setEditBoolean] = useState(false);
	const [toggleView, setViewBoolean] = useState(false);
	const [toggleDelete, setDeleteBoolean] = useState(false);

	// Used to store the selected term as a STRING type from the drop down menu.
	const [selectedTerm, setSelectedTerm] = useState("");

	// These are used for setting the values in editing or adding terms.
	const [termInput, setTermInput] = useState("");
	const [definitionInput, setDefinitionInput] = useState("");
	const [imagePathInput, setImagePathInput] = useState("");

	// This is used for presentation purpose.
	const [autoTermFill, setAutoTermFill] = useState("");

	/**
	 *
	 * @param {*} event is found when a user clicks a term from the drop down menu.
That term will be used to fetch the appropriate details from the server.
	 */
	const handleChange = event => {
		console.log("Value is: ", event.target.value);
		setTermInput(event.target.value);
		dispatch({
			type: "GLOSSARY/FETCH_TERM",
			// This is the term that is was clicked on from the drop down menu.
			payload: event.target.value,
		});
		setSelectedTerm(event.target.value);
	};

	/**
	 * This will allow the DOM to render a new state based on the 'ADD Term' being set to TRUE.
	 */
	const handleAdd = () => {
		console.log("Clicked on the Add Term Button");
		setAddBoolean(true);
		setEditBoolean(false);
		setViewBoolean(false);
		setDeleteBoolean(false);
		setTermInput("");
		setDefinitionInput("");
		setImagePathInput("");
	};
	/**
	 * @param {*} event setting the value of the term input when Adding a new term field.
	 */
	const handleTermInput = event => {
		setTermInput(event.target.value);
	};
	/**
	 * @param {*} event this is the value from the textfield that is being saved to a set variable.
	 */
	const handleDefinitionInput = event => setDefinitionInput(event.target.value);

	/**
	 *
	 * @param {*} event this is the value from the textfield that is being saved to a set variable.
	 */
	const handleImagePathInput = event => {
		setImagePathInput(event.target.value);
	};

	/**
	 * This will then use all the variables that were set from the users input. Then this will be sent to the appropriate saga that will then send to the database when adding a term to the database.
	 */
	const handleTermSubmit = () => {
		console.log(
			"Term / definition / image path",
			autoTermFill,
			definitionInput,
			imagePathInput
		);
		if (glossary?.some(obj => obj.term != autoTermFill)) {
			dispatch({
				type: "GLOSSARY/SET_NEW_TERM",
				payload: {
					term: autoTermFill,
					definition: definitionInput,
					imagePath: imagePathInput,
				},
			});
			// Clearing the field after this function is executed.
			setAutoTermFill("");
			setSelectedTerm("");
			setDefinitionInput("");
			setImagePathInput("");
		} else {
			console.log("Error duplicate");
		}
	};
	/**
	 * Changes the state of the DOM when EDIT button from the user tools is clicked on.
	 */
	const handleEdit = () => {
		if (glossary.some(obj => obj.term == termInput)) {
			console.log("Clicked on the Edit Button");
			setAddBoolean(false);
			setEditBoolean(true);
			setViewBoolean(false);
			setDeleteBoolean(false);
		}
	};
	/**
	 * Changes the state of the DOM when the VIEW button from the user tools is clicked on.
	 */
	const handleView = () => {
		if (glossary.some(obj => obj.term == termInput)) {
			console.log("Clicked on the View Button");
			setAddBoolean(false);
			setEditBoolean(false);
			setViewBoolean(true);
			setDeleteBoolean(false);
		}
	};
	/**
	 * Changes the state of the DOM when the DELETE button from the user tools is clicked on.
	 */
	const handleDelete = () => {
		if (glossary.some(obj => obj.term == termInput)) {
			console.log("Clicked on the Delete Button");
			setAddBoolean(false);
			setEditBoolean(false);
			setViewBoolean(false);
			setDeleteBoolean(true);
			setOpen(true);
		}
	};
	/**
	 * Confirms the deletion of the term from the MODAL pop up.
	 */
	const handleDeleteConfirm = () => {
		if (glossary.some(obj => obj.term == termInput)) {
			console.log("Clicked on the delete confirm button!");
			dispatch({
				type: "GLOSSARY/DELETE_TERM",
				payload: { id: glossaryTerm.id },
			});
			setOpen(false);
			dispatch({ type: "GLOSSARY/FETCH" });
		}
	};
	/**
	 * Within the Modal, the user can cancel the confirmation and close the pop up window.
	 */
	const handleCancel = () => {
		console.log("Clicked on the cancel button");
		setOpen(false);
	};
	/**
	 * When the user has the drop down menu term selected, then the edit input field is saved and sent to the saga and send to the database.
	 */
	const handleEditSubmit = () => {
		if (glossary.some(obj => obj.term == termInput)) {
			console.log("Clicked on the submit button in the Edit View");
			dispatch({
				type: "GLOSSARY/EDIT_TERM",
				payload: {
					id: glossaryTerm.id,
					description: definitionInput,
					img_path: imagePathInput,
				},
			});
			setDefinitionInput("");
			setImagePathInput("");
		}
	};
	/**
	 *
	 * @returns the default search term box found in all the states being rendered.
	 */
	const SearchTermDefault = () => {
		return (
			<Box
				sx={{
					m: 3,
					width: "calc(100vw- 50px)",
				}}>
				<Card sx={{ mt: 10, mb: 4, border: "solid 1pt" }} raised={true}>
					<Heading1 sx={{ textAlign: "center" }}>Manage Glossary</Heading1>
					<Box sx={{ textAlign: "center", margin: 2 }}>
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
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "center",
						}}>
						<Button
							variant='outlined'
							onClick={handleView}
							className={buttonStyle.viewButton}>
							View
						</Button>
						<Button
							variant='outlined'
							onClick={handleEdit}
							className={buttonStyle.editButton}>
							Edit
						</Button>

						<Button
							variant='outlined'
							onClick={handleDelete}
							className={buttonStyle.deleteButton}>
							Delete
						</Button>
						<Button
							variant='outlined'
							onClick={handleAdd}
							className={buttonStyle.addButton}>
							Add Term
						</Button>
					</Box>
				</Card>
			</Box>
		);
	};

	/**
	 *
	 * @returns The 'Adding New Term' field to populate to the DOM when the state is set to true after button click.
	 */
	const AddingFields = () => {
		return (
			<Card
				sx={{
					mt: 1,
					m: 3,
					border: "solid 1pt",
					width: "calc(100vw-50px)",
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
					<FormControl sx={{ minWidth: "100%", gap: 2 }}>
						<TextField
							label='name'
							value={autoTermFill}
							onChange={handleTermInput}
							sx={{ width: "100%" }}
						/>
						<TextField
							label='Definition'
							value={definitionInput}
							onChange={handleDefinitionInput}
							sx={{ width: "100%" }}
						/>
						<TextField
							label='Image'
							value={imagePathInput}
							onChange={handleImagePathInput}
							sx={{ width: "100%" }}
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
					sx={{ padding: 1, height: "40px", mt: 5, mb: 2 }}>
					Submit
				</Button>
			</Box>
		);
	};

	/**
	 *
	 * @returns This will be used throughout this view when content of the term is applicable to render to the DOM.
	 */
	const TermLogic = () => {
		return (
			<Box>
				<Heading3 sx={{ textAlign: "center" }} fontSx={{ fontWeight: 400 }}>
					{glossaryTerm.term}
				</Heading3>
				{glossaryTerm.description ? (
					<Typography>{glossaryTerm.description}</Typography>
				) : (
					<Typography>No Description</Typography>
				)}
				{glossaryTerm.img_path ? (
					<img src={glossaryTerm.img_path} />
				) : (
					<Typography>NO IMAGE AVAILABLE</Typography>
				)}
			</Box>
		);
	};

	/**
	 * This is created to render an autofill feature for presentation purpose only.
	 */
	const Autofill = () => {
		setAutoTermFill("Camping");
		setDefinitionInput(
			"When a character stays in one spot — “camps out” — to gain an unfair advantage and attack other characters without being seen. "
		);
		setImagePathInput(
			"https://steamuserimages-a.akamaihd.net/ugc/595844364268868296/620B89799B9E47B034DE798060F1C5DE2C047750/?imw=1024&imh=578&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
		);
	};

	/** Section: ADD button is clicked on.
	 */
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
		/** Section: View button is clicked on.
		 */
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
					sx={{
						border: "solid 1pt",
						margin: "24px",
					}}
					raised={true}>
					<TermLogic />
				</Card>
				<div className='foot-spacer' />
			</>
		);
		/** Section: DELETE button is clicked on.
		 */
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
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
							position: "fixed",
							top: "40%",
							border: "2px solid #000000",
							bgcolor: "#ffffff",
							padding: 2,
						}}>
						<Box sx={{ borderBottom: "solid 1px #C02222" }}>
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
		/** Section: EDIT button is clicked on.
		 */
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
					<Card sx={{ mt: 4, border: "solid 1pt", padding: 3 }} raised={true}>
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
								sx={{ width: "100%", mb: 2 }}
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
								sx={{ width: "100%" }}
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
				<div className='foot-spacer' />
			</Box>
		);
	} else {
		/** Section: INITIAL UPON LOADING.
		 */
		return (
			<Box>
				<SearchTermDefault />
			</Box>
		);
	}
}
export default AdminPage;
