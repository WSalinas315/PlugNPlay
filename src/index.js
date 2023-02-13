import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './components/App/App';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const bodyFonts = [ '"Open Sans"', '-apple-system', 'Roboto', '"Helvetica Neue"', 'sans-serif' ].join(',')

const theme = createTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#C02222',
		},
		secondary: {
			main: '#f44336',
		},
		neutral: {
			main: '#999999',
		},
	},
	typography: {
    fontFamily: bodyFonts,
		h1: {
      fontFamily: bodyFonts,
			fontWeight: '400',
			fontSize: '26px',
		},
    h2: {
      fontFamily: bodyFonts,
      fontWeight: '200',
      fontSize: '24px'
    },
		h3: {
      fontFamily: bodyFonts,
			fontWeight: '200',
			fontSize: '18px',
		},
    p: {
      fontFamily: bodyFonts,
      fontWeight: '400',
      fontSize: '16px',
    },
    detail: {
      fontFamily: bodyFonts,
      fontWeight: '200',
      fontSize: '13px',
    }
	},
	components: {
    MuiCard: {
      styleOverrides: {
        root: {
          position: 'relative',
          padding: '10px',
          margin: '5px'
        }
      }
    },
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: '12pt',
					fontWeight: '350',
          margin: '5px',
          padding: '2px',
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
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					margin: 15,
				},
				input: {
					margin: 1,
					padding: 2,
				},
			},
		},
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
						color: '#fff',
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
