import React from 'react'

const FilterPriceRange = () => {
    const select = (e) => {
        if(e.target.classList.contains('current_delevary_price')){
            e.target.classList.toggle("current_delevary_price")
        }
        else{
            e.target.classList.toggle("current_delevary_price")
        }
    }

    return (
        <div className="price_range shorts">
            <h1 style={{fontSize: "19px", fontWeight: 700, marginBottom: "12px"}}>
                Price range
            </h1>

            <div className="price_slide">
                <div onClick={select}>$</div>
                <div onClick={select}>$$</div>
                <div onClick={select}>$$$</div>
                <div onClick={select}>$$$$</div>
            </div>
        </div>
    )
}

export default FilterPriceRange
