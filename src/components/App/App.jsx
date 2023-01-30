import { useEffect } from 'react';
import {
	HashRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';

function App() {
	const dispatch = useDispatch();

	const user = useSelector(store => store.user);

	useEffect(() => {
		dispatch({ type: 'FETCH_USER' });
	}, [dispatch]);

	return (
		<Router>
			<div>
				<Nav />
				<Switch>
					<Redirect exact from='/' to='/home' />

					<Route exact path='/about'>
						<AboutPage />
					</Route>

					<ProtectedRoute exact path='/user'>
						<UserPage />
					</ProtectedRoute>

					<Route exact path='/login'>
						{user.id ? <Redirect to='/user' /> : <LoginPage />}
					</Route>

					<Route exact path='/registration'>
						{user.id ? <Redirect to='/user' /> : <RegisterPage />}
					</Route>

					<Route exact path='/home'>
						{user.id ? <Redirect to='/user' /> : <LoginPage />}
					</Route>

					<Route>
						<h1>404</h1>
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
