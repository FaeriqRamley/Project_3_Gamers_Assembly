import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {addUser,addFriend} from './store/actions';

function App() {
  const user = useSelector(state => state.user);
  const friendList = useSelector(state=> state.friendList);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(addUser("bob"));
    dispatch(addFriend("hello"));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {user}
        </p>
        <p>
          {JSON.stringify(friendList)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
