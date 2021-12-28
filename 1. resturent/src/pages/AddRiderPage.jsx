import React, { useState } from 'react'
import axios from 'axios'
import { BackendLink } from '../Api/BackendLink'
import Header from "../Ulitilyts/Header";
import HiddenHeader from "../Ulitilyts/HiddenHeader";

const AddRiderPage = (props) => {
    document.body.style.cssText = "height: unset; overflow: unset"
    
    const [HaveAccount, setHaveAccount] = useState(false)
    if (!props.ProfileItem) return "Loading...";
    if (!props.ProfileItem) return "Error!";
   

    axios.post(`${BackendLink}/api/users/checkbusiness`,{
        check: "rider",
        ID: props.ProfileItem.id
    })
    .then((res)=> {
        if(res.data === "has_account"){
            setHaveAccount(true)
        }
    })
    

    return (
     <>
     <Header id="show"/>
     <HiddenHeader
        ProfileItem={props.ProfileItem}
        UserItem={props.UserItem}
     />
     {HaveAccount ?
        <div>
            Play
        </div>:
        <div>No</div>
     }
     </>
    )
}

export default AddRiderPage
