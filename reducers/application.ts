import { State, ActionTypes, Action } from '../utils/types';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.AddInvoice:
      if (action.payload.addInvoice) {
        return {
          ...state,
          invoices: [...state.invoices, action.payload.addInvoice],
        };
      }
    case ActionTypes.InitializeInvoices:
      if (action.payload.invoices) {
        return {
          ...state,
          invoices: [...action.payload.invoices],
        };
      }
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
