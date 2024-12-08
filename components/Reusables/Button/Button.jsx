import React from 'react';
import styles from "./Button.module.scss";

function Button({ bgColor="white",textColor="black", hoverColor="black", text ,gradient}) {
  return (
    <button 
      className={styles.button}
      style={{
        backgroundColor: bgColor,
        background : gradient,
        color: textColor,
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease-in-out',
      }}
    >
      {text}
    </button>
  );
}

export default Button;