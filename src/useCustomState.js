import React, { useReducer } from 'react';
import { set, get, isObject, isArray, merge } from 'lodash';

const reducer = (state, action) => {
  switch (action.type) {
    case 'MERGE':
      if (isArray(state)) {
        return [...state, action.payload];
      }

      if (isObject(state)) {
        return set(
          { ...state },
          action.field,
          isObject(action.payload)
            ? merge(get(state, action.field), action.payload)
            : [...get(state, action.field), action.payload] // оставь
        );
      }

      return action.payload;
    case 'SET': {
      if (isObject(state)) {
        return set({ ...state }, action.field, action.payload);
      }

      return action.payload;
    }
    default:
      return state;
  }
};

const useCustomState = initialState => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    merge: (payload, field) => dispatch({ type: 'MERGE', field, payload }),
    set: (payload, field) => dispatch({ type: 'SET', field, payload })
  };

  return [state, actions];
};

export { useCustomState };
