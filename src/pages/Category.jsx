import React from 'react'
import Navigation from './Navigation'
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../css/category.css";

const category = () => {
  return (
    <div>
        <Navigation/>
        <div className={`${styles.banner} text-white `}>
            <div className="position-absolute top-50 start-50 translate-middle text-center">
            <h1>
                WELCOME TO <br /> C-WAREHOUSE
            </h1>
            <h3 className="fw-normal">
                
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsa
                quaerat soluta quod! Minus hic ad maxime soluta iure magnam.
            </h3>
            </div>
      </div>
    </div>
  )
}

export default category