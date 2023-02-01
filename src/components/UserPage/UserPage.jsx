import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const logout = () => {
    console.log('logging out');
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <button
        onClick={logout}
      >Logout</button>
    </div>
  );
}

export default UserPage;