import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, addFriend, loadUserDetails } from "./store/actions";
import UserDetails from "./components/userdetails/userDetailsLayout";
import UserCard from "./components/userdetails/userCard";
import Landing from "./components/landing/landing";

function App() {
  const user = useSelector((state) => state.user);
  const friendList = useSelector((state) => state.friendList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addUser("bob"));
    dispatch(addFriend("hello"));
    // dispatch(loadUserDetails);
  }, []);

  return (
    <React.Fragment>
      <UserDetails />
    </React.Fragment>
  );
}

export default App;
