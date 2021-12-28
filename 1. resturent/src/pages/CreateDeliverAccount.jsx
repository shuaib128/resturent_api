import React from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { BackendLink } from '../Api/BackendLink'

const CreateDeliverAccount = () => {
    document.body.style.cssText = "height: unset; overflow: unset"
    
    const BusinessAccountHandler = () => {
        const accestoken = localStorage.getItem("accestoken")
        const content_decoded = jwt_decode(accestoken)

        axios.post(`${BackendLink}/api/users/createrideraccount`, {
            id: content_decoded.user_id
        })
    }

    return (
        <div className="createbusinessaccount">
            <div className="businesscreate_main">
                <div className="create_business_left">
                    <h1>Good food is great for business</h1>
                    <p>
                        Delight customers, treat remote workers,
                        and motivate employees at the office with food delivery.
                    </p>
                    <button onClick={BusinessAccountHandler}>
                        Get started for free
                    </button>
                </div>

                <div className="create_business_right">
                    <img src="/images/servigfood.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default CreateDeliverAccount
