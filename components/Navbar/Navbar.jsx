'use client'
import React,{useState,useEffect} from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import styles from "./Navbar.module.scss"
import Button from '../Reusables/Button/Button'
import {auth} from '@/firebase/config'

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className={styles.navbar}>
        <h1>GenResume.AI</h1>
        <ul>
            <li>Job Finder</li>
            <li>AI Resume</li>
        </ul>
        {user ? (
          <div className={styles.auth}>
            <p>Welcome, {user.displayName || "User"}!</p>
            <div onClick={handleSignOut}><Button text="Sign Out" textColor="white"/></div>
          </div>
        ) : (
          <div onClick={handleSignIn}><Button text="Sign Up" textColor="white" /></div>
        )}    
    </nav>  
  )
}
