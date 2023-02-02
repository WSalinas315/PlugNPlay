import React from "react";

function ViewProfile () {
  //const profileImage = require("./basic.jpeg");
  return (
    <div className="container">
    <h2> Profile</h2>

    <div><img src='images/defualt.png' /></div>

    <p> Full Name</p>
    <input placeholder="full name" ></input>

    <p> Username</p>
    <input placeholder="username" ></input>

    <p>Email</p>
    <input placeholder="email" ></input>

    <div id="picture" className= "container">
  </div>

  <button> Edit </button>
  
  <button> Save </button>
  

  </div>
  )
}


export default ViewProfile;