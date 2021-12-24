import React from 'react'

const ResturentsPreloaders = () => {
    var loderArray = [1, 2, 3, 4, 5, 6]

    return (
        <div className='res-loders'>
            {loderArray.map((load) => (
                <div className="res-load">
                    <div className="loader-img"></div>
                    <div className="loader-title"></div>
                    <div className="loader-dis"></div>
                </div>
            ))}
        </div>
    )
}

export default ResturentsPreloaders
