export default class APIService{
    //Get all article datas
    static GetAllArticels(token, article_state, search_data){
        fetch(`http://127.0.0.1:8000/api/restaurants/?foodItems__category__title__icontains=${search_data}`, {
        'method': 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Token ${token}` 
        }
        })
        .then(resp => resp.json())
        .then(resp => {
            //Filter by search query
            const ids = resp.map(o => o.id)
            const unique_articles = resp.filter(({id}, index) => !ids.includes(id, index + 1))
            article_state(unique_articles)
        })
        .catch(error => console.log(error))
    }


    //Get single article data
    static GetSingleArticels(id_, token, article_state){
        fetch(`http://127.0.0.1:8000/api/restaurants/${id_}/`, {
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