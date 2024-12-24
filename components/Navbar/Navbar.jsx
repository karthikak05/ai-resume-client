'use client'
import React from 'react';
import styles from './Navbar.module.scss';
import Button from '../Reusables/Button/Button';
import { navItems } from '@/data/navbar';
import { useRouter } from 'next/navigation';
import useUserStore from '@/utils/userStore';
import { handleUserSignOut } from '@/utils/usersHandler';

export default function Navbar() {
  const { currentUser, clearCurrentUser } = useUserStore();
  const router = useRouter();

  const handleRedirect = (link) => {
    router.push(link);
  };

  const handleAuth = async () => {
    if (currentUser === null) {
      router.push('/login')
    } else {
      const response = await handleUserSignOut();
      if (response.status === 'success') {
        console.log('Signed out successfully');
        clearCurrentUser(); 
        router.push('/login'); 
      } else {
        console.error(response.message);
      }
    }
  };

  return (
    <nav className={styles.navbar}>
      <h1 onClick={() => router.push('/')} className={styles.header}>
        GenResume.AI
      </h1>
      <ul>
        {navItems.map((item, i) => (
          <li key={i} onClick={() => handleRedirect(item.link)}>
            {item.name}
          </li>
        ))}
      </ul>
      <div className={styles.auth}>
        <div>
          <Button
            text={currentUser === null ? 'Sign In' : 'Sign Out'}
            textColor="black"
            onClick={handleAuth} 
          />
        </div>
      </div>
    </nav>
  );
}
