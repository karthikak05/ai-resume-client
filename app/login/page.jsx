import React from 'react'
import sytles from "./login.module.scss";
import LoginPage from '@/components/LoginPage/LoginPage';

export default function Login() {
    const content = {
        type:"Login",
        left:{
            heading : "Nice to See You Again",
            text: "WELCOME BACK"
        },
        right:{
            heading : "Login Account",
            tags :["Email ID","Password"],
            redirectText : "Don't have an account?",
            link : "/signup",
            loginRedirect : "/"
        }
    }
  return (
    <div className={sytles.main}>
        {/* <div className={sytles.left}>
            <div className={sytles.bg}></div>
            <div className={sytles.company}>
                <svg width="24px" height="24px" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.12004 11.0999C8.92565 11.0999 11.2 8.82554 11.2 6.01994C11.2 3.21433 8.92565 0.939941 6.12004 0.939941C3.31443 0.939941 1.04004 3.21433 1.04004 6.01994C1.04004 8.82554 3.31443 11.0999 6.12004 11.0999Z" stroke="white" stroke-width="0.49" stroke-miterlimit="10"/>
                <path d="M6.11995 9.18997C7.87069 9.18997 9.28995 7.77072 9.28995 6.01997C9.28995 4.26923 7.87069 2.84998 6.11995 2.84998C4.36921 2.84998 2.94995 4.26923 2.94995 6.01997C2.94995 7.77072 4.36921 9.18997 6.11995 9.18997Z" stroke="white" stroke-width="0.49" stroke-miterlimit="10"/>
                <path d="M6.11992 7.21994C6.78266 7.21994 7.31992 6.68268 7.31992 6.01994C7.31992 5.3572 6.78266 4.81995 6.11992 4.81995C5.45718 4.81995 4.91992 5.3572 4.91992 6.01994C4.91992 6.68268 5.45718 7.21994 6.11992 7.21994Z" fill="white" stroke="white" stroke-width="0.49" stroke-miterlimit="10"/>
                </svg>
                <p>GENRESUME.AI</p>
            </div>
            <div className={sytles.content}>
                <p>Nice To See You Again</p>
                <h1>WELCOME BACK</h1>
            </div>
        </div>

        <div className={sytles.right}>
            <h1>Login Account</h1>
            <div className={sytles.contentRight}>
                {loginTags.map((tag,i)=>(
                <div className={sytles.input} key={i}>
                    <input type={tag} placeholder={tag} />
                </div>
                ))}
                <div className={sytles.row}>
                    <p className={sytles.textGray}>Keep me Signed In</p>
                    <p>Already a Member?</p>
                </div>
                <div className={sytles.btnContainer}><Button text="Login" textColor="white" bgColor="#097FF5"/></div>
            </div>
        </div> */}
        <LoginPage content={content}/>
    </div>
  )
}
