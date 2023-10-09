import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = (
      Object.keys(actions).reduce((acc, key) => {
        const fn = actions[key];
        acc[key] = fn(dispatch);

        return acc;
      }, {})
    )

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    )
  }

  return { Context, Provider };
}
