import React from 'react'
import { gsap, Power3 } from 'gsap'
import { Link, useHistory } from 'react-router-dom'

const Header = (props) => {
    const history = useHistory()
    const tl = gsap.globalTimeline

    //Menu apper
    const menuapper = () => {
        var hidden_header = document.querySelector('.hidden_header');
        var menu = document.querySelector('.menubar');
        var main_menu = document.querySelector('.hidden_main');

        menu.style.zIndex = 0
        tl.to(hidden_header, .3, {visibility: 'visible', opacity: .6})
          .to(main_menu, .4, {left: 0, ease: Power3.easeOut, delay: .2})
    }


    //Search Funconality
    const search_ = (event) => {       
        if(event.keyCode === 13){
            history.push(`/search/query?q=${event.target.value}`)
        }       
    }

    return (
        <div className="header">
            <div className="logo_menu_bar">
                <button className="menubar" onClick={menuapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                        <line x1="4" y1="12" x2="20" y2="12"></line>
                        <line x1="4" y1="6" x2="20" y2="6"></line>
                        <line x1="4" y1="18" x2="20" y2="18"></line>
                    </svg>
                </button>
                <Link to={'/'}>
                    <h1 className="logo">Shu <span style={{color: "#06c167"}}>Eats</span></h1>
                </Link>
            </div>

            <div style={{display: 'flex'}}>
                <div className="delevary_option">
                    <p className="active_delivary_system">Delivery</p>
                    <p>Pickup</p>
                    <p>Dine-in</p>
                </div>

                <div className="place_locator">
                    <p style={{position: 'relative', top: '4px'}}>
                        <svg width="16px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Deliver to" role="img" focusable="false"><path d="M17.5834 5.16602C14.5001 2.08268 9.50008 2.08268 6.41675 5.16602C3.33341 8.24935 3.33341 13.3327 6.41675 16.416L12.0001 21.9993L17.5834 16.3327C20.6667 13.3327 20.6667 8.24935 17.5834 5.16602ZM12.0001 12.416C11.0834 12.416 10.3334 11.666 10.3334 10.7493C10.3334 9.83268 11.0834 9.08268 12.0001 9.08268C12.9167 9.08268 13.6667 9.83268 13.6667 10.7493C13.6667 11.666 12.9167 12.416 12.0001 12.416Z" fill="#000000"></path></svg>                        
                    </p>
                    <p style={{position: 'relative', top: '4px'}}>
                        <span style={{fontWeight: 700, marginLeft: '7px'}}>
                            New York
                        </span> . Dine in now
                    </p>
                </div>
            </div>

            <div style={{display: 'flex'}}>
                <div className="search_bar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input onKeyDown={search_} type="search" placeholder="What you want to eat?" />
                </div>

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
    )
}

export default Header
