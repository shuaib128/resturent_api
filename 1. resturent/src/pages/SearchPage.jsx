import React, { useState, useEffect } from 'react';
import Header from '../Ulitilyts/Header'
import ResturentsList from '../components/HomePageComponents/ResturentsList';
import Filter from '../components/HomePageComponents/Filter';
import FilterResponsive from '../components/HomePageComponents/FilterResponsive';
import HiddenHeader from '../Ulitilyts/HiddenHeader'
import HeaderResponsive from '../Ulitilyts/HeaderResponsive';
import Nodata from '../components/SearchPageComponents/Nodata';
import ResturentsPreloaders from '../PreLoadersComponnets/ResturentsPreloaders';
import { BackendLink } from '../Api/BackendLink';
import axios from 'axios';

const SearchPage = (props) => {
    const [articles, setArticles] = useState([])
    const [result_status, setresult_status] = useState([])

    //Get query from the url
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries());

    useEffect(() => {
        axios.post(`${BackendLink}/api/restaurants/resturent/search/`, {
            search_query: params
        })
            .then((res) => {
                if (res.data !== "No Resturent") {
                    setArticles(res.data);
                }
                else {
                    setresult_status(res.data);
                }
            })
    }, [])


    return (
        <>
            <Header
                id="show"
            />

            <HeaderResponsive />

            <div className="home_page_middle">
                <Filter />
                <FilterResponsive />
                <HiddenHeader
                    ProfileItem={props.ProfileItem}
                    UserItem={props.UserItem}
                    ProfileID={props.ProfileID}
                />
                {articles.length !== 0 ?
                    <ResturentsList
                        articles={articles}
                    /> :
                    articles.length === 0 && result_status !== "No Resturent" ? <ResturentsPreloaders /> :
                        result_status === "No Resturent" ? <Nodata params={params} /> :
                            <div></div>
                }
            </div>
        </>
    )
}

export default SearchPage
