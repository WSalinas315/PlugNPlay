import { combineReducers } from "redux";

const glossary = (state = [], { type, payload }) => {
  return {
    'GLOSSARY/SET': payload,
    'GLOSSARY/CLEAR': []
  }[type] || state;
}

const glossaryItem = (state = {}, { type, payload }) => {
  return {
    'GLOSSARY/SET_ITEM': payload,
    'GLOSSARY/CLEAR_ITEM': {}
  }[type] || state;
}

export default combineReducers({
  glossary,
  glossaryItem
})