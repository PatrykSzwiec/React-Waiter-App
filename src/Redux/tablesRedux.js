import { API_URL } from "../config";
import { setLoading } from "./loadingRedux";

//selectors
export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, id) => tables.find((table) => table.id === id);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });
export const addTable = (tableData) => ({ type: ADD_TABLE, payload: tableData });

export const fetchTables = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

      fetch(API_URL + '/tables')
      .then(res => res.json())
      .then(tables => {
        dispatch(updateTables(tables));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setLoading(false));
      });
};
};

export const addTableRequest = (tableData) => {
  return (dispatch, getState) => {
    const state = getState();
    const existingTableIds = state.tables.map((table) => parseInt(table.id, 10));
    const nextTableId = findNextTableId(existingTableIds);

    const newTableData = {
      ...tableData,
      id: nextTableId.toString(),
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTableData),
    };

    fetch(API_URL + "/tables", options)
      .then(() => dispatch(addTable(newTableData)));
  };
};

// Helper function to find the next available table ID
const findNextTableId = (existingIds) => {
  const sortedIds = existingIds.sort((a, b) => a - b);
  let nextId = 1;

  for (let i = 0; i < sortedIds.length; i++) {
    if (nextId !== sortedIds[i]) {
      break;
    }

    nextId++;
  }

  return nextId;
};

export const editTableRequest = (updatedTable) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTable),
    };

    fetch(API_URL + '/tables/' + updatedTable.id, options)
     .then(() => dispatch(editTable(updatedTable)))
  }
};


const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload] ;

    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));

    case ADD_TABLE:
      return [...statePart, action.payload];

    default:
      return statePart;
  };
};
export default tablesReducer;