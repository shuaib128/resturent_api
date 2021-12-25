import React from 'react'

const FoodModal = (props) => {
    return (
        <div className={"food_modal food_modal_" + props.item.id}>
            <img className='modal_image' src={props.item.image} alt="model" />
            <div className="foodModal_des">
                <p className='food_modal_title'>{props.item.title}</p>
                <p className='food_modal_des'>{props.item.body}</p>
            </div>
        </div>
    )
}

export default FoodModal
