import { createContext, useReducer } from 'react';
const DUMMY_DATA = [];

export const CurrienciesContext = createContext({
	curriencies: [],
	addCurrency: ({ id, title, value }) => {},
	deleteCurrency: (id) => {},
});

const currienciesReducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			const secondState = state.filter(
				(currency) => currency.id !== action.payload.id
			);
			return [{ ...action.payload }, ...secondState];
		case 'DELETE':
			return state.filter((currency) => currency.id !== action.payload);
		default:
			return state;
	}
};

const CurrienciesContextProvider = ({ children }) => {
	const [currienciesState, dispatch] = useReducer(
		currienciesReducer,
		DUMMY_DATA
	);

	const addCurrency = (currencyData) => {
		dispatch({ type: 'ADD', payload: currencyData });
	};
	const deleteCurrency = (id) => {
		dispatch({ type: 'DELETE', payload: id });
	};

	const value = {
		curriencies: currienciesState,
		addCurrency: addCurrency,
		deleteCurrency: deleteCurrency,
	};

	return (
		<CurrienciesContext.Provider value={value}>
			{children}
		</CurrienciesContext.Provider>
	);
};

export default CurrienciesContextProvider;
