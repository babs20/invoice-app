import { useReducer } from 'react';
import reducer from '../reducers/application';
import { State, Action } from '../utils/types';

interface ApplicationData<PayloadType> {
  state: State;
  dispatch: React.Dispatch<Action<PayloadType>>;
}

const initialState: State = {
  invoices: [],
};

export const useApplicationData = <
  PayloadType
>(): ApplicationData<PayloadType> => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
};

export default useApplicationData;
