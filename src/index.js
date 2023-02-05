import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './components/App/App';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#C02222',
		},
		secondary: {
			main: '#f44336',
		},
	},
	typography: {
		h1: {
			fontWeight: '200',
			fontSize: '12pt',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: '16pt',
					fontWeight: '600',
				},
			},
		},
		MuiBottomNavigation: {
			styleOverrides: {
				root: {
					background: '#c02222',
					fontWeight: '800',
				},
			},
		},
		// MuiSvgIcon: {
		// 	styleOverrides: {
		// 		root: {
		// 			color: '#C02222',
		// 		},
		// 	},
		// },
		MuiBottomNavigationAction: {
			styleOverrides: {
				label: {
					color: '#ffffff',
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					color: '#ffffff',
					'&.Mui-selected': {
						color: '#000000',
						transform: 'scale(1.5)',
					},
				},
			},
		},
	},
});

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('react-root')
);
