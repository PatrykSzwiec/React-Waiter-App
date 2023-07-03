import { API_URL } from "../config";
import { setLoading } from "./loadingRedux";
import shortid from "shortid";

//selectors
export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, id) => tables.find((table) => table.id === id);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');
const DELETE_TABLE = createActionName('DELETE_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });
export const addTable = (tableData) => ({ type: ADD_TABLE, payload: tableData });
export const deleteTable = (id) => ({ type: DELETE_TABLE, payload: id });

// thunk for deleting the table
export const deleteTableRequest = (id) => {
  return (dispatch) => {
    fetch(API_URL + '/tables/' + id, { method: 'DELETE' })
      .then(() => dispatch(deleteTable(id)));
  };
};

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
  return (dispatch) => {
    const newTableData = {
      ...tableData,
      id: shortid.generate(),
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

export const editTableRequest = (updatedTable) => {
  return (dispatch, getState) => {
    const { tables } = getState();
    const existingTable = tables.find((table) => table.id === updatedTable.id && table.status === "Busy");


    if (existingTable && updatedTable.status !== "Busy") {
      updatedTable.bill = 0;
    }

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
      return statePart.map((table) =>
        (table.id === action.payload.id ? { ...table, ...action.payload } : table));

    case ADD_TABLE:
      return [...statePart, action.payload];

    case DELETE_TABLE:
      return statePart.filter(table => table.id !== action.payload);

    default:
      return statePart;
  };
};
export default tablesReducer;