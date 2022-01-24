import React from 'react'

const FilterDelevary = () => {
    const checkUncheck = (e) => {
        console.log(e.target);
    }

    return (
        <div className="shorts delevarymax">
            <h1 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "12px" }}>
                Max Delevary Fee
            </h1>
            <ul>
                <li>
                    <input type="checkbox" className='sortcheck'
                        // onChange={e => setisDinein(e.target.checked)}
                        onClick={checkUncheck}
                    />
                    $2
                </li>
                <li>
                    <input type="checkbox" className='sortcheck'
                        // onChange={e => setisDinein(e.target.checked)}
                        onClick={checkUncheck}
                    />
                    $3
                </li>
                <li>
                    <input type="checkbox" className='sortcheck'
                        // onChange={e => setisDinein(e.target.checked)}
                        onClick={checkUncheck}
                    />
                    $4
                </li>
                <li>
                    <input type="checkbox" className='sortcheck'
                        // onChange={e => setisDinein(e.target.checked)}
                        onClick={checkUncheck}
                    />
                    $4+
                </li>
            </ul>
        </div>
    )
}

export default FilterDelevary
