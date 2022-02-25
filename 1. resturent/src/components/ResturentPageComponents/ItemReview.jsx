import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { BackendLink } from '../../Api/BackendLink';

const ItemReview = (props) => {
    const [Rating, setRating] = useState(null);
    const [Hover, setHover] = useState(null);
    const [Review, setReview] = useState("");

    /**
     * Send data to backend
     */
    const ReviewRequest = () => {
        URL = `${BackendLink}/api/restaurants/add/review/`
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }

        let formData = new FormData()
        formData.append('rating', Rating)
        formData.append('review', Review)
        formData.append('foodID', props.id)

        axios
            .post(URL, formData, config)
            .then(res => {

            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='review_section'>
            <p style={{ fontSize: "20px", fontWeight: 700 }}>Leave a review</p>
            <div>
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1

                    return (
                        <label>
                            <input
                                type="radio"
                                name='rating'
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                                className='ratingRadio'
                            />
                            <FaStar
                                className='star'
                                color={ratingValue <= (Hover || Rating) ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    )
                })}
            </div>

            <textarea
                className='reviewInput'
                placeholder='Review'
                onChange={e => setReview(e.target.value)}
            />
            <button className='review_add_btn' onClick={ReviewRequest}>Add</button>
        </div>
    )
};

export default ItemReview;