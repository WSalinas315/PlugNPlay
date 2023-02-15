import { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Header from '../Header/Header';
import AdminPage from '../ViewAdmin/ViewAdmin';
import ViewSearch from '../ViewSearch/ViewSearch';
import CollectionPage from '../ViewCollection/ViewCollection';
import ViewProfile from '../ViewProfile/ViewProfile';
import SearchResults from '../SearchResults/SearchResults';
import Survey from '../Survey/Survey';
import RecommendedList from '../RecommendedList/RecommendedList';
import GameItem from '../GameItem/GameItem';
import ViewSettings from '../ViewSettings/ViewSettings';
import './App.css';

function App() {
	const dispatch = useDispatch();

	const user = useSelector(store => store.user);

	useEffect(() => {
		dispatch({ type: 'FETCH_USER' });
	}, [dispatch]);

	return (
		<Router>
			<Header />
			<div>
				<Nav />
				<Switch>
					<Redirect exact from='/' to='/home' />
					<Route exact path='/about'>
						<AboutPage />
					</Route>
					<ProtectedRoute exact path='/user'>
						<RecommendedList />
					</ProtectedRoute>

					<ProtectedRoute exact path='/collection'>
						<CollectionPage />
					</ProtectedRoute>

					<ProtectedRoute exact path='/profile'>
						<ViewProfile />
					</ProtectedRoute>

					<ProtectedRoute exact path='/admin'>
						<AdminPage />
					</ProtectedRoute>

					<ProtectedRoute exact path='/search'>
						<ViewSearch />
					</ProtectedRoute>

					<ProtectedRoute exact path='/searchresults/:id'>
						<SearchResults />
					</ProtectedRoute>

					<ProtectedRoute exact path='/settings'>
						<ViewSettings />
					</ProtectedRoute>

					<ProtectedRoute exact path='/games/:id'>
						<GameItem />
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
					<Route exact path='/survey/:id'>
						{user.id ? <Survey /> : <LoginPage />}
					</Route>
					<Route>
						<h1>404</h1>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
