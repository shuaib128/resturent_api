import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Token } from '../../Api/Token';
import APIService from '../../Api/ApiServices';
import ResturentsPreloaders from '../../PreLoadersComponnets/ResturentsPreloaders';
import FoodModal from './FoodModal';

const FoodItems = (props) => {
    var categories = []

    //Fetch resturent data
    const { id } = useParams()
    const [articles, setArticles] = useState([])
    const [filterCategory, setFilterCategory] = useState("")
    useEffect(() => {
        APIService.GetSingleArticels(id, Token, setArticles)
    }, [])


    //Get all category to display
    for (const key in articles.foodItems) {
        categories.push(articles.foodItems[key].categoryName)
    }
    categories = [...new Set(categories)];

    //Modal apper function
    const modealApper = (event) => {
        var target_element = event.target.parentElement.parentElement.nextSibling
        var model_background = document.querySelector(".modal_background")

        target_element.style.display = "block"
        model_background.style.display = "block"
    }

    //Modal dissper function
    const modalDissaple = (event) => {
        var target_element = document.querySelectorAll(".food_modal")
        var model_background = document.querySelector(".modal_background")

        for (var i = 0, len = target_element.length; i < len; i++) {
            target_element[i].style.display = "none"
        }
        model_background.style.display = "none"
    }


    return (
        <>
            <div className='modal_background' onClick={modalDissaple}></div>

            <div className="food_Section">
                <div className="categiry_filter">
                    {categories && categories.map(cat => {
                        return (
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

                {articles.length !== 0 ?
                    <div className="food_items">
                        {articles.foodItems && articles.foodItems.map(item => {
                            if (item.categoryName.includes(filterCategory)) {
                                return (
                                    <div>
                                        <div
                                            className="menu_item"
                                            key={item.id}
                                            id={item.categoryName.replace(/\s/g, "_")}
                                        >
                                            <div className="menu_img">
                                                <img src={item.image} alt='imgr' />
                                            </div>
                                            <div className="menu_left">
                                                <h1 className="menu_title"
                                                    onClick={modealApper}
                                                >
                                                    {item.title.slice(0, 30)}...
                                                </h1>
                                                <p className="menu_description">{item.body.slice(0, 55)}...</p>
                                                <p className="menu_price">${item.price}</p>
                                            </div>
                                        </div>

                                        <FoodModal
                                            item={item}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </div> :
                    <ResturentsPreloaders />
                }
            </div>
        </>
    )
}

export default FoodItems
