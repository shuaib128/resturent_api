import React from 'react'
import FilterShort from './FilterShort'
import FilterPriceRange from './FilterPriceRange'
import FilterDelevary from './FilterDelevary'
import FilterDietary from './FilterDietary'
import { Delete } from 'lucide-react';

const FilterResponsive = () => {
    //filter dissper
    const filterDissper = () => {
        document.querySelector('.filter_responsive').style.cssText = "display: none"
    }


    return (
        <div className="filter filter_responsive">
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "5px" }}>
                    All stores
                </h1>
                <Delete color='black' size={25} onClick={filterDissper} />
            </div>
            <FilterShort />
            <FilterPriceRange />
            <FilterDelevary />
            <FilterDietary />
        </div>
    )
}

export default FilterResponsive
