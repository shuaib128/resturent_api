import React, { useState } from 'react';
import Header from '../Ulitilyts/Header'
import ResturentsList from '../components/HomePageComponents/ResturentsList';
import Filter from '../components/HomePageComponents/Filter';
import FilterResponsive from '../components/HomePageComponents/FilterResponsive';
import HiddenHeader from '../Ulitilyts/HiddenHeader'
import HeaderResponsive from '../Ulitilyts/HeaderResponsive';
import ResturentsPreloaders from '../PreLoadersComponnets/ResturentsPreloaders';
import axios from 'axios';
import { BackendLink } from '../Api/BackendLink';

const HomePage = (props) => {
    //Fetch the list from djnago backend
    const [pagenum, setpagenum] = useState(1)
    const [articles, setArticles] = useState(() => {
        axios.post(`${BackendLink}/api/restaurants/`, {
            pagenum: pagenum
        })
            .then((res) => {
                setArticles(res.data);
            })
    })
    const [searchData, setSearchData] = useState("");
    const [LoaingPost, setLoaingPost] = useState(true)


    //Initial Rendearing
    return (
        <>
            <Header
                id="show"
                param={window.location.pathname}
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
                {articles ?
                    <ResturentsList
                        articles={articles}
                        LoaingPost={LoaingPost}
                        setLoaingPost={setLoaingPost}
                        pagenum={pagenum}
                        setpagenum={setpagenum}
                        setArticles={setArticles}
                    /> :
                    <ResturentsPreloaders />
                }
            </div>

            {!LoaingPost ?
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                :
                ''
            }
        </>
    )
}

export default HomePage
