import React from 'react'
import LoginPage from '@/components/LoginPage/LoginPage';

export default function Signup() {
  const content = {
    type:"Signup",
    left:{
        heading : "Make your first step towards success",
        text: "START YOUR JOURNEY"
    },
    right:{
        heading : "Signup Account",
        tags :["Username","Email ID","Password","Confirm Password"],
        redirectText : "Already have an account?",
        link : "/login",
        loginRedirect : "/login"
    }
}
  return (
    <div>
      <LoginPage content={content}/>
    </div>
  )
}
