import { combineReducers } from 'redux';

// stores data for the full glossary 
const glossary = (state = [], { type, payload }) => {
	return (
		{
			'GLOSSARY/SET': payload,
			'GLOSSARY/CLEAR': [],
		}[type] || state
	);
};

// stores data for a specific glossary term
const glossaryItem = (state = [], { type, payload }) => {
	return (
		{
			'GLOSSARY/SET_ITEM': payload,
			'GLOSSARY/CLEAR_ITEM': [],
		}[type] || state
	);
};

export default combineReducers({
	glossary,
	glossaryItem,
});
