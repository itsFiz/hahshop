import React from 'react'
import hah from './hah.png'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="gradient-background">
      <div className="content">
        <div className="left-col">
          <h1>
            Shopping with a <span> HAH! </span>Where Every Purchase Sparks Joy
          </h1>
        </div>

        <img src={hah}></img>
        <div className="right-col">
          <button>Shop Now</button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
