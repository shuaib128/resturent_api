import {React} from 'react';
import { Link } from 'react-router-dom'
import { BackendLink } from '../../Api/BackendLink';

const SearchResults = (props) => {
    if (!props.articles) return "Loading...";
    if (!props.articles) return "Error!";
    if (!props.articles) return "Error!";
    
    //Initial Rendearing
    return (
        <div className="resturents">
            {props.articles && props.articles.map((article, index) => {
                return(
                    <div className="resturent" key={index}>
                        <div className="resturent_image">
                            <Link to={'/returent/'+article.id}>
                                <img 
                                    src={BackendLink + article.image} 
                                    alt="food"
                                />
                            </Link>
                        </div>

                        <div className="name_revue">
                            <h2 className="resturent_name">
                                <Link to={'/returent/'+article.id}>
                                    {article.title}
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

export default SearchResults
