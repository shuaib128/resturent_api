import {React, useState} from 'react';
import { BackendLink } from '../../Api/BackendLink';

const ItemLists = (props) => {
    var categories = []

    //Fetch resturent data
    const [filterCategory, setFilterCategory] = useState("")
    
    //Get all category to display
    for(const key in props.articles){
        categories.push(props.articles[key].categoryName)
    }
    categories = [...new Set(categories)];
    

    return (
        <>           
            <div className="food_Section food_Section_additem">
                <div className="categiry_filter categiry_filter_add_item">
                    {categories && categories.map(cat => {
                        return(
                            <li 
                                onClick={() => setFilterCategory(cat)}
                                key={Math.random()} 
                                className="categiry" 
                                id={cat}
                            >
                                {cat}
                            </li>
                        )
                    })}
                    <li onClick={() => setFilterCategory("")} className="categiry">All</li>
                </div>

                <div className="food_items food_items_additem">             
                    {props.articles && props.articles.map(item => {
                        if(item.categoryName.includes(filterCategory)){
                            return(
                                <div 
                                    className="menu_item" 
                                    key={item.id} 
                                    id={item.categoryName.replace(/\s/g, "_")}
                                >
                                    <div className="menu_left">
                                        <h1 className="menu_title">{item.title}</h1>
                                        <p className="menu_description">{item.body.slice(0, 55)}...</p>
                                        <p className="menu_price">${item.price}</p>
                                    </div>
        
                                    <div className="menu_img">
                                        <img 
                                            src={
                                                item.image.includes(BackendLink) ?
                                                item.image :
                                                `${BackendLink}${item.image}`
                                            }
                                            alt='img'
                                        />
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default ItemLists
