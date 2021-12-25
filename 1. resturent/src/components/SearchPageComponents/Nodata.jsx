import React from 'react'
import { Link } from 'react-router-dom'

const Nodata = (props) => {
    return (
        <div className='no_res'>
            <img src="/images/avacado.svg" alt="avacado" />
            <h1>We didnt find a match for<br></br>"{props.params.q}"</h1>
            <p>Try searching for something else instead</p>
            <Link to={"/"}>View All</Link>
        </div>
    )
}

export default Nodata
