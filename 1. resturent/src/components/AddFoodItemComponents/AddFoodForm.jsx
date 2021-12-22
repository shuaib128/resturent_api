import React, { useState } from 'react'
import axios from 'axios'
import { BackendLink } from '../../Api/BackendLink'
import { useParams } from 'react-router-dom';


const AddFoodForm = (props) => {
    const [Name, setName] = useState("")
    const [Description, setDescription] = useState("")
    const [Distance, setDistance] = useState("")
    const [Catogory, setCatogory] = useState("")
    const [coverimage, setCoverimage] = useState();
    const { id } = useParams()

    //Handle image upload
    const uploadCover = (e) => {
        setCoverimage({
            image: e.target.files[0],
        });

        var prevImgSec = document.querySelector('.res_prevImage')
        const file = e.target.files

        const reader = new FileReader()
        reader.addEventListener("load", function () {
            prevImgSec.innerHTML += `
                <img src=${this.result} />
            `
        })
        reader.readAsDataURL(file[0])
    }

    //Add new resturent
    const NewRestorant = async (e) => {
        e.preventDefault();

        URL = `${BackendLink}/api/restaurants/add/item/`
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }

        let formData = new FormData()
        formData.append('Name', Name)
        formData.append('Description', Description)
        formData.append('Distance', Distance)
        formData.append('Catogory', Catogory)
        formData.append('userID', props.ProfileItem.user)
        formData.append('resturent_id', id)
        try {
            formData.append('coverimage', coverimage.image)
        } catch (error) {

        }

        axios
            .post(URL, formData, config)
            .then(res => {
                props.setArticles([...props.articles, res.data])
            })
            .catch((err) => console.log(err))

        setName("")
        setDescription("")
        setDistance("")
        setCoverimage("")
        setCatogory("")
        document.querySelector(".res_add_form").reset()
    }

    return (
        <div>
            <form className="res_add_form" onSubmit={NewRestorant}>
                <input type="text" placeholder="Name"
                    onChange={e => setName(e.target.value)}
                />
                <textarea placeholder="Description"
                    onChange={e => setDescription(e.target.value)}
                />
                <input type="number" placeholder="Price"
                    onChange={e => setDistance(e.target.value)}
                />
                <input type="text" placeholder="Category"
                    onChange={e => setCatogory(e.target.value)}
                />
                <input type="file" accept="image/*"
                    onChange={uploadCover}
                />

                <div className="res_prevImage"></div>

                {Name && Description && Distance &&  Location && coverimage ?
                    <button type='submit' className="res_add_button">Add</button>
                    :
                    <button className="res_add_button" disabled>Add</button>
                }
            </form>
        </div>
    )
}

export default AddFoodForm
