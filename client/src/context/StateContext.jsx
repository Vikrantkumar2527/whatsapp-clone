import { createContext, useReducer,useContext } from "react";

// Create a context
export const StateContext = createContext();

// StateProvider component to wrap the app and provide state
export const StateProvider = ({ initialState, reducer, children }) => (
 
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );

export const useStateProvider =() => useContext(StateContext)