import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { gsap, Power3 } from 'gsap'
import { BackendLink } from '../Api/BackendLink';
import axios from 'axios';

const HiddenHeader = (props) => {
    const history = useHistory()
    const tl = gsap.globalTimeline

    const menudissper = () => {
        var hidden_header = document.querySelector('.hidden_header');
        var menu = document.querySelector('.menubar');
        var main_menu = document.querySelector('.hidden_main');

        menu.style.zIndex = 20
        tl.to(hidden_header, .3, {opacity: 0, visibility: 'hidden', delay: .3})
          .to(main_menu, .4, {left: '-30%', ease: Power3.easeOut})
    }

    //Logout function
    const logout = () => {
        localStorage.removeItem("accestoken");
        history.push("/login")
    }

    return (
        <>
        <div className="hidden_header" onClick={menudissper}></div>
        <div className="hidden_main">
            {props.UserItem !== undefined ?
                <div>
                    <img 
                        className='profile_image' 
                        src={BackendLink + props.ProfileItem.image}
                        alt="proInage"
                    />
                    <p style={{
                        marginBottom: "10px",
                        textAlign: "center"
                    }}>
                        {props.UserItem.username}
                    </p>
                </div>:
                <div></div>
            }

            {props.UserItem === undefined ?
                <div>
                    <p className="signup_btn">
                        <Link style={{color: 'white'}} to={'/signup'}>Sign in</Link>
                    </p>
                </div>:
                <div>
                    <p className="signup_btn">
                        <Link style={{color: 'white'}}
                            onClick={logout}
                        >
                            Sign Out
                        </Link>
                    </p>
                </div>
            }

            {props.ProfileItem && props.ProfileItem.business_account !== true ?
                <p className="business_btn">
                    <Link style={{fontSize: '16px'}} to={'/create/business'}>
                        Create a business account
                    </Link>
                </p>:
                <p className="business_btn">
                    <Link style={{fontSize: '16px'}} to={'/add/resturent'}>
                        Visit Business Account
                    </Link>
                </p>
            }

            {props.ProfileItem && props.ProfileItem.rider_account !== true ?
                <p className="signtodelever_btn">
                    <Link style={{fontSize: '16px'}} to={'/create/ride'}>
                        Sign up to deliver
                    </Link>
                </p>:
                <p className="signtodelever_btn">
                    <Link style={{fontSize: '16px'}} to={'/add/rider'}>
                        Check Delevery
                    </Link>
                </p>
            }
        </div>
        </>
    )
}

export default HiddenHeader
