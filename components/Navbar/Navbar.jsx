'use client'
import React from 'react'
import styles from "./Navbar.module.scss"
import Button from '../Reusables/Button/Button'
import { navItems } from '@/data/navbar';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

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
          <div className={styles.auth}>
            <div onClick={()=>(router.push("/login"))}><Button text="SignIn" textColor="black"/></div>
          </div>
    </nav>  
  )
}
