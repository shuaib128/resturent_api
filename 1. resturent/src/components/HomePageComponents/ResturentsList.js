import {React} from 'react';
import { Link } from 'react-router-dom'

const ResturentsList = (props) => {
    //Initial Rendearing
    return (
        <div className="resturents">
            {props.articles && props.articles.map(article => {
                return(
                    <div className="resturent" key={article.id}>
                        <div className="resturent_image">
                            <Link to={'/returent/'+article.id}>
                                <img src={article.image} alt="food"/>
                            </Link>
                        </div>

                        <div className="name_revue">
                            <h2 className="resturent_name">
                                <Link to={'/returent/'+article.id}>
                                    {article.title.slice(0, 25)}...
                                </Link>
                            </h2>
                            <p className="revew">4.7</p>    
                        </div> 

                        <div className="distance">
                            <img className="dis_icon" src="/images/distance.png" alt="food"/>
                            <p className="dis">{article.distance}</p>
                        </div>                     
                    </div>
                )
            })}
        </div>
    )
}

export default ResturentsList
