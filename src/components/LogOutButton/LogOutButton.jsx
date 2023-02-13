import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      sx={{ px: '2rem', my: '1.2rem' }}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;