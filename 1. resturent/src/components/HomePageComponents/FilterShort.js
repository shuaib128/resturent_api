import React, { useState } from 'react'
import axios from 'axios';

const FilterShort = () => {
    const [Default, setDefault] = useState(true);
    const [Populer, setPopuler] = useState(false);
    const [Rating, setRating] = useState(false);
    const [DeleveryTime, setDeleveryTime] = useState(false);

    //Chek and unchek others
    const checkUncheck = (e) => {
        var checkboxes = document.querySelectorAll(".short")
        for (let index = 0; index < checkboxes.length; index++) {
            checkboxes[index].checked = false
        }

        setDefault(false)
        setPopuler(false)
        setRating(false)
        setDeleveryTime(false)
        
        e.target.checked = true
    }

    return (
        <div className="shorts">
            <h1 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "12px" }}>
                Sort
            </h1>
            <ul>
                <li className="current_sort">
                    <input type="checkbox" className='sortcheck short' defaultChecked
                        onChange={e => setDefault(e.target.checked)}
                        onClick={checkUncheck}
                    />
                    Picked for you (default)
                </li>

                <li>
                    <input type="checkbox" className='sortcheck short'
                        onChange={e => setPopuler(e.target.checked)}
                        onClick={checkUncheck}
                    />
                    Most popular
                </li>

                <li>
                    <input type="checkbox" className='sortcheck short'
                        onChange={e => setRating(e.target.checked)}
                        onClick={checkUncheck}
                    />
                    Rating
                </li>

                <li>
                    <input type="checkbox" className='sortcheck short'
                        onChange={e => setDeleveryTime(e.target.checked)}
                        onClick={checkUncheck}
                    />
                    Delivery time
                </li>
            </ul>
        </div>
    )
}

export default FilterShort
