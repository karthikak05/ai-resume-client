'use client'
import React, { useState } from 'react';
import styles from './loginPage.module.scss';
import { useRouter } from 'next/navigation';
import Button from '../Reusables/Button/Button';
import { handleUserLogin, handleUserSignUp } from '@/utils/usersHandler';
import useUserStore from '@/utils/userStore';

export default function LoginPage({ content }) {
  const { currentUser, setCurrentUser } = useUserStore();
  const router = useRouter();

  const [tagValues, setTagValues] = useState(
    content.right.tags.reduce((acc, tag) => ({ ...acc, [tag]: '' }), {})
  );

  const handleInputChange = (e, tag) => {
    setTagValues({ ...tagValues, [tag]: e.target.value });
  };

  const handleClick = ()=>{
    switch (content.type) {
      case "Login":
        router.push("/smart-search");
        break;
      case "Signup":
        router.push("/login");
        break;
      default:
        break;
    }
  }

  const handleGoogleSignIn = async () => {
    let result;
    if (content.type === "Login") {
      result = await handleUserLogin();
    } else {
      result = await handleUserSignUp();
    }
    if (result.status === "success" || result.status === "exists") {
      switch (content.type) {
        case "Login":
          router.push("/smart-search");
          break;
        case "Signup":
          router.push("/login");
          break;
        default:
          break;
      }
      setCurrentUser(result.user);
    }
  };

  return (
    <div className={styles.main}>
      {/* Left Section */}
      <div className={styles.left}>
        <div className={styles.bg}></div>
        <div className={styles.company}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.12004 11.0999C8.92565 11.0999 11.2 8.82554 11.2 6.01994C11.2 3.21433 8.92565 0.939941 6.12004 0.939941C3.31443 0.939941 1.04004 3.21433 1.04004 6.01994C1.04004 8.82554 3.31443 11.0999 6.12004 11.0999Z"
              stroke="white"
              strokeWidth="0.49"
              strokeMiterlimit="10"
            />
            <path
              d="M6.11995 9.18997C7.87069 9.18997 9.28995 7.77072 9.28995 6.01997C9.28995 4.26923 7.87069 2.84998 6.11995 2.84998C4.36921 2.84998 2.94995 4.26923 2.94995 6.01997C2.94995 7.77072 4.36921 9.18997 6.11995 9.18997Z"
              stroke="white"
              strokeWidth="0.49"
              strokeMiterlimit="10"
            />
            <path
              d="M6.11992 7.21994C6.78266 7.21994 7.31992 6.68268 7.31992 6.01994C7.31992 5.3572 6.78266 4.81995 6.11992 4.81995C5.45718 4.81995 4.91992 5.3572 4.91992 6.01994C4.91992 6.68268 5.45718 7.21994 6.11992 7.21994Z"
              fill="white"
              stroke="white"
              strokeWidth="0.49"
              strokeMiterlimit="10"
            />
          </svg>
          <p>GENRESUME.AI</p>
        </div>
        <div className={styles.content}>
          <p>{content.left.heading}</p>
          <h1>{content.left.text}</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.right}>
        <h1>{content.right.heading}</h1>
        <div className={styles.contentRight}>
          {content.right.tags.map((tag, i) => (
            <div className={styles.input} key={i}>
              <input
                placeholder={tag}
                value={tagValues[tag]}
                onChange={(e) => handleInputChange(e, tag)}
              />
            </div>
          ))}
          <div className={styles.row}>
            <p onClick={() => router.push(content.right.link)}>
              {content.right.redirectText}
            </p>
          </div>
          <div
            className={styles.googleBtnContainer}
            onClick={handleGoogleSignIn}
          >
            <p>{content.type} With Google</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          </div>
          <div className={styles.btnContainer} onClick={handleClick}>
            <Button text={content.type} textColor="white" bgColor="#097FF5" />
          </div>
        </div>
      </div>
    </div>
  );
}
