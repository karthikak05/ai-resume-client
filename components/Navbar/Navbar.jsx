'use client'
import React,{useState,useEffect} from 'react'
import styles from "./Navbar.module.scss"
import Button from '../Reusables/Button/Button'
import { navItems } from '@/data/navbar';
import { useRouter } from 'next/navigation';
import { handleUserSignIn,handleUsersSignOut } from '@/utils/usersHandler';
import {auth} from '@/utils/firebase'


export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
  }, []);

  const handleSignIn = async () => {
    await handleUserSignIn();
  };

  const handleSignOut = async () => {
    await handleUsersSignOut();
  };

  const handleRedirect = (link)=>{
    router.push(link)
  };

  return (
    <nav className={styles.navbar}>
        <h1 onClick={()=>(router.push("/"))} className={styles.header}>GenResume.AI</h1>
        <ul>
            {navItems.map((item,i)=>(
              <li key={i} onClick={()=>handleRedirect(item.link)}>{item.name}</li>
            ))}
        </ul>
        {user ? (
          <div className={styles.auth}>
            <p>Welcome, {user.displayName || "User"}!</p>
            <div onClick={handleSignOut}><Button text="Sign Out" textColor="white"/></div>
          </div>
        ) : (
          <div onClick={handleSignIn}><Button text="Sign In" textColor="white" /></div>
        )}    
    </nav>  
  )
}
