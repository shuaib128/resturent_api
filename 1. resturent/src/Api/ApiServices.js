import { BackendLink } from "./BackendLink"

export default class APIService{
    //Get all article datas
    static GetAllArticels(token, article_state){
        fetch(`${BackendLink}/api/restaurants/`, {
        'method': 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Token ${token}` 
        }
        })
        .then(resp => resp.json())
        .then(resp => {
            article_state(resp)
        })
        .catch(error => console.log(error))
    }


    //Get single article data
    static GetSingleArticels(id_, token, article_state){
        fetch(`${BackendLink}/api/restaurants/${id_}/`, {
        'method': 'GET',
        headers: {
            'Content-Type':'application/json',
        }
        })
        .then(resp => resp.json())
        .then(resp => article_state(resp))
        .catch(error => console.log(error))
    }
}