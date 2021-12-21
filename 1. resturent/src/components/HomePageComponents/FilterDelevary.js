import React from 'react'

const FilterDelevary = () => {
    const select = (e) => {
        if(e.target.classList.contains('current_sort')){
            e.target.classList.toggle("current_sort")
        }
        else{
            e.target.classList.toggle("current_sort")
        }
    }

    return (
        <div className="shorts delevarymax">
            <h1 style={{fontSize: "19px", fontWeight: 700, marginBottom: "12px"}}>
                Max Delevary Fee
            </h1>
            <ul>
                <li className="current_sort" onClick={select}>$2</li>
                <li onClick={select}>$3</li>
                <li onClick={select}>$4</li>
                <li onClick={select}>$4+</li>
            </ul>
        </div>
    )
}

export default FilterDelevary
