import React, { useState, useEffect } from 'react';
import Header from '../Ulitilyts/Header'
import ResturentsList from '../components/HomePageComponents/ResturentsList';
import Filter from '../components/HomePageComponents/Filter';
import HiddenHeader from '../Ulitilyts/HiddenHeader'
import { Token } from '../Api/Token';
import APIService from '../Api/ApiServices';

const HomePage = (props) => {
    //Fetch the list from djnago backend
    const [articles, setArticles] = useState([])
    const [searchData, setSearchData] = useState("");
        
    useEffect(() => {
        APIService.GetAllArticels(Token, setArticles, searchData)
    }, [searchData])


    //Initial Rendearing
    return (
        <>
            <Header passSearchData={setSearchData} id="show"/>
            <div className="home_page_middle">
                <Filter />
                <HiddenHeader
                    ProfileItem={props.ProfileItem}
                    UserItem={props.UserItem}
                    ProfileID={props.ProfileID}
                />
                <ResturentsList articles={articles}/>
            </div>
        </>
    )
}

export default HomePage