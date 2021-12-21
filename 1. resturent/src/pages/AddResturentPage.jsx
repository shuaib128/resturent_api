import React, { useState } from 'react'
import axios from 'axios'
import { BackendLink } from '../Api/BackendLink'
import Header from "../Ulitilyts/Header";
import HiddenHeader from "../Ulitilyts/HiddenHeader";
import ResturentLists from '../components/AddResturentPage/ResturentLists'
import ResturentAddForm from '../components/AddResturentPage/ResturentAddForm';

const AddResturentPage = (props) => {
    const [HaveAccount, setHaveAccount] = useState(false)
    if (!props.ProfileItem) return "Loading...";
    if (!props.ProfileItem) return "Error!";

    axios.post(`${BackendLink}/api/users/checkbusiness`, {
        check: "business",
        ID: props.ProfileItem.id
    })
        .then((res) => {
            if (res.data === "has_account") {
                setHaveAccount(true)
            }
        })

    return (
        <>
            <Header id="show" />
            <HiddenHeader
                ProfileItem={props.ProfileItem}
                UserItem={props.UserItem}
            />
            {HaveAccount ?
                <div className="full_re_add_view">
                    <div className="add_res_left">
                        <ResturentAddForm
                            ProfileItem={props.ProfileItem}
                            articles={props.UserResturents}
                            setUserResturents={props.setUserResturents}
                        />
                    </div>

                    <div className="add_res_right">
                        <ResturentLists
                            articles={props.UserResturents}
                        />
                    </div>
                </div> :
                <div>No</div>
            }
        </>
    )
}

export default AddResturentPage
