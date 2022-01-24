import React, { useState } from 'react'
import axios from 'axios'
import { BackendLink } from '../Api/BackendLink'
import Header from "../Ulitilyts/Header";
import HiddenHeader from "../Ulitilyts/HiddenHeader";
import ResturentLists from '../components/AddResturentPage/ResturentLists'
import ResturentAddForm from '../components/AddResturentPage/ResturentAddForm';
import HeaderResponsive from '../Ulitilyts/HeaderResponsive';
import ResturentsPreloaders from '../PreLoadersComponnets/ResturentsPreloaders';

const AddResturentPage = (props) => {
    document.body.style.cssText = "height: unset; overflow: unset"
    
    const [searchData, setSearchData] = useState("")
    const [HaveAccount, setHaveAccount] = useState(false)

    if (!props.ProfileItem) return(
        <div style={{padding: "5%"}}>
            <ResturentsPreloaders />
        </div>
    );
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
            <HeaderResponsive
                passSearchData={setSearchData}
            />
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
                <div></div>
            }
        </>
    )
}

export default AddResturentPage
