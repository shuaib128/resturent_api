import { React, useState } from 'react';
import { BackendLink } from '../../Api/BackendLink';
import AddItemModal from './AddItemModal';

const ItemLists = (props) => {
    var categories = []

    //Fetch resturent data
    const [filterCategory, setFilterCategory] = useState("")

    //Get all category to display
    for (const key in props.articles) {
        categories.push(props.articles[key].categoryName)
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

            <div className="food_Section food_Section_additem">
                <div className="categiry_filter categiry_filter_add_item">
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

                <div className="food_items food_items_additem">
                    {props.articles && props.articles.map(item => {
                        if (item.categoryName.includes(filterCategory)) {
                            return (
                                <div>
                                    <div
                                        className="menu_item"
                                        key={item.id}
                                        id={item.categoryName.replace(/\s/g, "_")}
                                    >
                                        <div className="menu_left">
                                            <h1 className="menu_title"
                                                onClick={modealApper}
                                            >
                                                {item.title}
                                            </h1>
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

                                    <AddItemModal
                                        item={item}
                                    />
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
