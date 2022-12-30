import React from "react";
import Login from "./Login";
import './auth.css'
import Image from './Image';
import './sign.css'

export default function SignInAccount() {
  return (
    <div className='container main-block'>
        <div className='row mb-5'>
            <Image/>
            <div className='right-block col-5 pb-4'>
                <h1>Lovebirds</h1>
                <Login/>
            </div>
        </div>
    </div>
);
}
