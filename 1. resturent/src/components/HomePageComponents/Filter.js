import React from 'react'
import FilterShort from './FilterShort'
import FilterPriceRange from './FilterPriceRange'
import FilterDelevary from './FilterDelevary'
import FilterDietary from './FilterDietary'

const Filter = () => {
    return (
        <div className="filter">
            <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "5px" }}>
                All stores
            </h1>

            <div className='clear_filter_Seach'>
                <p className='clear_filter_clear_button'>Clear all</p>
            </div>

            <FilterShort />
            <FilterPriceRange />
            <FilterDelevary />
            <FilterDietary />
        </div>
    )
}

export default Filter
