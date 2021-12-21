import React from 'react'

const FilterShort = () => {
    const select = (e) => {
        if(e.target.classList.contains('current_sort')){
            e.target.classList.toggle("current_sort")
        }
        else{
            e.target.classList.toggle("current_sort")
        }
    }

    return (
        <div className="shorts">
            <h1 style={{fontSize: "19px", fontWeight: 700, marginBottom: "12px"}}>
                Sort
            </h1>
            <ul>
                <li className="current_sort" onClick={select}>Picked for you (default)</li>
                <li onClick={select}>Most popular</li>
                <li onClick={select}>Rating</li>
                <li onClick={select}>Delivery time</li>
            </ul>
        </div>
    )
}

export default FilterShort
