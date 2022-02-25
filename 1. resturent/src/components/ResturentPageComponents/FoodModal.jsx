import React from 'react'
import ItemReview from './ItemReview'
import ItemReviews from './ItemReviews'

const FoodModal = (props) => {
    const input_structre = JSON.parse(props.item.item_structor)

    return (
        <div className={"food_modal food_modal_" + props.item.id}>
            <img className='modal_image' src={props.item.image} alt="model" />
            <div className="foodModal_des">
                <p className='food_modal_title'>{props.item.title}</p>
                <p className='food_modal_des'>{props.item.body}</p>

                <div className="fields_extras">
                    {input_structre.map((item, index) => (
                        <div key={index}>
                            <h1>{item[0]}</h1>

                            <div className='extras'>
                                {item.map((menu, index) => {
                                    if (index !== 0) {
                                        return (
                                            <div>
                                                {index % 2 !== 0 ?
                                                    <p>{menu}</p> :
                                                    <p>{menu}</p>
                                                }
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <ItemReview id={props.item.id} />
                <ItemReviews Reviews={props.item.reviews} />
            </div>
        </div>
    )
}

export default FoodModal
