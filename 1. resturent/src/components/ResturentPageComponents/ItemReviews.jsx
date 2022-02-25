import React from 'react'

const ItemReviews = (props) => {
    return (
        <div className='Reviews'>
            {props.Reviews && props.Reviews.map((review, index) => (
                <p>{review.body}</p>
            ))}
        </div>
    )
}

export default ItemReviews