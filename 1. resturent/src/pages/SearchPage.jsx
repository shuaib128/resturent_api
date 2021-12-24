import React, { useState, useEffect } from 'react';
import Header from '../Ulitilyts/Header'
import ResturentsList from '../components/HomePageComponents/ResturentsList';
import Filter from '../components/HomePageComponents/Filter';
import FilterResponsive from '../components/HomePageComponents/FilterResponsive';
import HiddenHeader from '../Ulitilyts/HiddenHeader'
import HeaderResponsive from '../Ulitilyts/HeaderResponsive';
import { Token } from '../Api/Token';
import APIService from '../Api/ApiServices';
import ResturentsPreloaders from '../PreLoadersComponnets/ResturentsPreloaders';

const SearchPage = (props) => {
    const [articles, setArticles] = useState([])
    const urlSearchParams = new URLSearchParams(window.location.search)
    //Get query from the url
    const params = Object.fromEntries(urlSearchParams.entries());

    useEffect(() => {
        APIService.GetAllArticels(Token, setArticles, params.q)
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
                    <ResturentsPreloaders />
                }
            </div>
        </>
    )
}

export default SearchPage
