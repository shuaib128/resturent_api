import {React, useState} from 'react';
import { useParams } from 'react-router-dom'
import ResturentMapOpenDates from './ResturentMapOpenDates';
import { gsap } from 'gsap'
import axios from 'axios';

const ResturentBillBord = () => {
    //Fetch resturent data
    const { id } = useParams()
    const [articles, setArticles] = useState(() => {
        axios.get(`http://127.0.0.1:8000/api/restaurants/${id}/`)
        .then(res => setArticles(res.data))
    })

    //Map and Open Date Models
    const tl = gsap.globalTimeline
    const openmapmodel = () => {
        var full_map_box = document.querySelector('.map_box_open_full');
        var map_box = document.querySelector('.map_open_date');

        tl.to(full_map_box, .3, {visibility: 'visible', opacity: .6})
          .to(map_box, .2, {visibility: 'visible', opacity: 1})
    }
    if (!articles) return "Loading...";
    if (!articles) return "Error!";

    return (
        <>
            <div className="billbord">
                <img className="billbordImg" src={articles.image} />

                <div className="name_del_fee">
                    <h1 className="res_name">{articles.title}</h1>
                    <div className="del_dis">
                        <img className="dis_icon" src="/images/distance.png" />
                        <p>  •  ${articles.delevary_fee} Delevary Fee  •  {articles.distance}  •  4.6(172)</p>
                    </div>
                </div>

                <div className="res_down">
                    <p className='resturent_des'>{articles.body}</p>
                    <p className='resturent_adress'>
                        {articles.store_location}  •  
                        <span className="resturent_monre" onClick={openmapmodel}>More</span>
                    </p>
                </div>
                <ResturentMapOpenDates 
                    returent_name={articles.title}
                    store_latitude={articles.store_latitude}
                    store_longitude={articles.store_longitude}
                />
            </div>
        </>
    )
}

export default ResturentBillBord
