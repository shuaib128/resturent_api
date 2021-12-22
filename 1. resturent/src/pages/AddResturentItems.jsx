import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { BackendLink } from '../Api/BackendLink'
import Header from '../Ulitilyts/Header'
import HiddenHeader from '../Ulitilyts/HiddenHeader'
import AddFoodForm from '../components/AddFoodItemComponents/AddFoodForm'
import HeaderResponsive from '../Ulitilyts/HeaderResponsive';
import ItemLists from '../components/AddFoodItemComponents/ItemLists'

const AddResturentItems = (props) => {
    const [searchData, setSearchData] = useState("");
    const { id } = useParams()
    const [articles, setArticles] = useState([])
    useEffect(() => {
        axios.get(`${BackendLink}/api/restaurants/${id}/`)
        .then((res) => setArticles(res.data.foodItems))
    }, [])

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
                        <AddFoodForm
                            ProfileItem={props.ProfileItem}
                            articles={articles}
                            setArticles={setArticles}
                        />
                    </div>

                    <div className="add_res_right">
                        <ItemLists
                            articles={articles}
                        />
                    </div>
                </div> :
                <div>No</div>
            }
        </>
    )
}

export default AddResturentItems
