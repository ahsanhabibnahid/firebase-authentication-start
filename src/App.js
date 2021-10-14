import './App.css';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({
    isLogIn: false,
    name: '',
    email: '',
    photo: ''
  })

  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user

        const logInStatus = {
          isLogIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(logInStatus)


      })
  }

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      const logOutStatus = {
        isLogIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(logOutStatus)
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className="App">
      {
        user.isLogIn ? <button onClick={handleSignOut}>Sign Out</button> :
          <button onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isLogIn && <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
