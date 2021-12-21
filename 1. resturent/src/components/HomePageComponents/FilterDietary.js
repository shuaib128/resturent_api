import React from 'react'

const FilterDietary = () => {
    const select = (e) => {
        if(e.target.parentElement.classList.contains('current_delevary_price')){
            e.target.parentElement.classList.toggle("current_delevary_price")
        }
        else{
            e.target.parentElement.classList.toggle("current_delevary_price")
        }
    }

    return (
        <div className="shorts diyetary">
            <h1 style={{fontSize: "19px", fontWeight: 700, marginBottom: "12px"}}>
                Dietary
            </h1>

            <div className="diteary_options">
                <div className="dietary_option">
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="c5 c6 c7 c8"><path d="M14.083 2.833c-4.333 0-7.916 3.583-7.916 7.917v5.333L2.75 19.5l1.75 1.75 3.417-3.417h4.5a8.749 8.749 0 008.75-8.75v-6.25h-7.084zm0 2.5h3.75L8.667 14.5v-3.75c0-3 2.416-5.417 5.416-5.417z"></path></svg>
                    <p onClick={select}>Vegetarian</p>
                </div>
                <div className="dietary_option">
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="c5 c6 c7 c8"><path fillRule="evenodd" clipRule="evenodd" d="M12 5.182C13.09 4 14.546 2.909 16.546 2.909 19.727 2.91 22 5.546 22 8.82c0 1.636-.727 3-1.818 4.09L12 20.637l-8.182-7.728C2.636 11.91 2 10.455 2 8.82c0-3.273 2.273-5.91 5.455-5.91 2 0 3.454 1.182 4.545 2.273zm0 6.09l3.364-3.182 1.818 1.818-5.182 5-5.182-5L8.636 8.09 12 11.272z"></path></svg>
                    <p onClick={select}>Vegaen</p>
                </div>
                <div className="dietary_option">
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="c5 c6 c7 c8"><path d="M9.917 12.417l1.666-1.667c1.25-1.25 1.584-3.167.75-4.833L10.75 2.75 9.083 4.417c-1.25 1.25-1.583 3.166-.75 4.833l1.584 3.167zM13.25 12.417l-1.667 1.666 3.167 1.584c1.583.833 3.5.5 4.833-.75l1.667-1.667-3.167-1.583c-1.666-.834-3.583-.5-4.833.75zM7.333 11L5.75 7.833 4.083 9.5c-1.25 1.25-1.583 3.167-.75 4.833L4.917 17.5l1.666-1.667c1.25-1.333 1.584-3.25.75-4.833zM8.25 17.417l-1.667 1.666 3.167 1.584c1.583.833 3.5.5 4.833-.75l1.667-1.667-3.167-1.583c-1.666-.834-3.583-.5-4.833.75zM19.5 2.833c-2.75 0-5 2.25-5 5V9.5h1.667c2.75 0 5-2.25 5-5V2.833H19.5z"></path></svg>
                    <p onClick={select}>Gluten-free</p>
                </div>
                <div className="dietary_option">
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="c5 c6 c7 c8"><path d="M21.167 13.666c0-2.3-1.867-4.166-4.167-4.166V12c.917 0 1.667.75 1.667 1.666h-3.334V5.333h-2.5v8.125a1.878 1.878 0 01-1.875 1.875H8.667v2.5h2.291a4.346 4.346 0 003.409-1.667h6.8v-2.5zM4.5 14.916a.413.413 0 01-.417.417H2v2.5h2.083A2.92 2.92 0 007 14.916V5.333H4.5v9.583z"></path><path d="M11.167 5.333h-2.5v8.333h2.5V5.333z"></path></svg>
                    <p onClick={select}>Halal</p>
                </div>
                <div className="dietary_option">
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="c5 c6 c7 c8"><path d="M11.167 4.592V2.834h-2.5v1.758c-4.759.65-5.834 4.909-5.834 4.909H17s-1.075-4.259-5.833-4.909z"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.75 11.168H3.257s-.416 7.275 6.667 10c1.424-.548 2.545-1.28 3.427-2.1A5.81 5.81 0 0112 15.333c0-1.631.67-3.106 1.75-4.165z"></path><path d="M22 13.667L20.333 12l-2.083 2.083L16.167 12 14.5 13.667l2.083 2.083-2.083 2.083 1.667 1.667 2.083-2.083 2.083 2.083L22 17.833l-2.083-2.083L22 13.667z"></path></svg>
                    <p onClick={select}>Allergy Friendly</p>
                </div>
            </div>
        </div>
    )
}

export default FilterDietary