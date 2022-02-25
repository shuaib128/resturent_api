import { React, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { BackendLink } from '../../Api/BackendLink';
import axios from 'axios';

const ResturentsList = (props) => {
    const observer = useRef()

    const sendMoreReqInfnityScroll = (pageNUM) => {
        axios.post(`${BackendLink}/api/restaurants/`, {
            pagenum: pageNUM
        })
            .then((res) => {
                props.setArticles(e => {
                    try {
                        return [...props.articles, ...res.data]
                    } catch (error) {
                        axios.post(`${BackendLink}/api/restaurants/`, {
                            pagenum: pageNUM
                        }).then((res) => {
                            props.setArticles(res.data);
                        })
                    }
                })
                props.setLoaingPost(true)
            })
    }

    const lastElement = useCallback(node => {
        if (!props.LoaingPost) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                if (props.LoaingPost) {
                    props.setLoaingPost(false)
                    props.setpagenum((prevstate) => prevstate + 1)

                    if (props.pagenum !== 1) {
                        sendMoreReqInfnityScroll(props.pagenum)
                    } else {
                        sendMoreReqInfnityScroll(2)
                    }
                }
            }
        })
        if (node) observer.current.observe(node)
    }, [props.pagenum, props.LoaingPost])

    if (!props.articles) return "Loading..."
    if (!props.articles) return "Error!"
    if (!props.articles) return "Error!"

    //Calculate avarage
    const calAvgRating = () => {

    }

    //Initial Rendearing
    return (
        <div className="resturents">
            {props.articles && props.articles.map((article, index) => {
                if (props.articles.length === index + 1) {
                    return (
                        <div className="resturent" key={index} ref={lastElement}>
                            <div className="resturent_image">
                                <Link to={'/returent/' + article.id}>
                                    <img
                                        src={BackendLink + article.image}
                                        alt="food"
                                    />
                                </Link>
                            </div>

                            <div className="name_revue">
                                <h2 className="resturent_name">
                                    <Link to={'/returent/' + article.id}>
                                        {article.title}
                                    </Link>
                                </h2>
                                <p className="revew">4.7</p>
                            </div>

                            <div className="distance">
                                <img className="dis_icon" src="/images/distance.png" alt="food" />
                                <p className="dis">{article.distance}</p>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="resturent" key={index}>
                            <div className="resturent_image">
                                <Link to={'/returent/' + article.id}>
                                    <img
                                        src={BackendLink + article.image}
                                        alt="food"
                                    />
                                </Link>
                            </div>

                            <div className="name_revue">
                                <h2 className="resturent_name">
                                    <Link to={'/returent/' + article.id}>
                                        {article.title}
                                    </Link>
                                </h2>
                                <p className="revew">
                                    {article.get_avg_ratings !== null ? article.get_avg_ratings:
                                        0
                                    }
                                </p>
                            </div>

                            <div className="distance">
                                <img className="dis_icon" src="/images/distance.png" alt="food" />
                                <p className="dis">{article.distance}</p>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default ResturentsList