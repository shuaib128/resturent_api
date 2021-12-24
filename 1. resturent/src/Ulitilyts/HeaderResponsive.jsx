import React from 'react'
import { gsap, Power3 } from 'gsap'
import { Link, useHistory } from 'react-router-dom'
import { ChevronDown, Filter } from 'lucide-react';

const HeaderResponsive = (props) => {
    const history = useHistory()
    const tl = gsap.globalTimeline

    //Menu apper
    const menuapper = () => {
        var hidden_header = document.querySelector('.hidden_header');
        var menu = document.querySelector('.menubar');
        var main_menu = document.querySelector('.hidden_main');

        menu.style.zIndex = 0
        tl.to(hidden_header, .3, { visibility: 'visible', opacity: .6 })
            .to(main_menu, .4, { left: 0, ease: Power3.easeOut, delay: .2 })
    }

    //filter apper
    const filterApper = () => {
        document.querySelector('.filter_responsive').style.cssText = "display: block"
    }


    //Search Funconality
    const search_ = (event) => {       
        if(event.keyCode === 13){
            history.push(`/search/query?q=${event.target.value}`)
        }       
    }

    return (
        <div className='header_response_div'>
            <div className="header header_response">
                <div className="logo_menu_bar">
                    <button className="menubar" onClick={menuapper}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <line x1="4" y1="6" x2="20" y2="6"></line>
                            <line x1="4" y1="18" x2="20" y2="18"></line>
                        </svg>
                    </button>
                    <Link to={'/'}>
                        <h1 className="logo">Shu <span style={{ color: "#06c167" }}>Eats</span></h1>
                    </Link>
                </div>

                <div style={{ display: 'flex' }}>
                    <div className="cart_btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>
                        </svg>
                        Cart • 0
                    </div>
                </div>
            </div>

            <div className='res_header_down'>
                <div className="dine_in_now_box">
                    <p className='delever_now'>Deliver now</p>
                    <div className='current_city'>
                        <p className="current_city_p">New York</p>
                        <ChevronDown color='black' size={20} />
                    </div>
                </div>

                <div className="delevary_options">
                    <form>
                        <select id="delevary_options_">
                            <option value="Delivery">Delivery</option>
                            <option value="Pickup">Pickup</option>
                            <option value="Dine-in">Dine-in</option>
                        </select>
                    </form>
                </div>
            </div>

            <div className='res_search'>
                <div className="search_bar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input onKeyDown={search_} type="search" placeholder="What you want to eat?" />
                    <Filter color='black' size={20} onClick={filterApper} />
                </div>
            </div>
        </div>
    )
}

export default HeaderResponsive
