import React, { useState } from 'react'
import axios from 'axios'
import { BackendLink } from '../../Api/BackendLink'


const ResturentAddForm = (props) => {
    const [Name, setName] = useState("")
    const [Description, setDescription] = useState("")
    const [Distance, setDistance] = useState("")
    const [DelevaryFee, setDelevaryFee] = useState()
    const [Location, setLocation] = useState("")
    const [Longitude, setLongitude] = useState("")
    const [Langitude, setLangitude] = useState("")
    const [coverimage, setCoverimage] = useState();

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

        URL = `${BackendLink}/api/restaurants/add/resturent/`
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }

        let formData = new FormData()
        formData.append('Name', Name)
        formData.append('Description', Description)
        formData.append('Distance', Distance)
        formData.append('DelevaryFee', DelevaryFee)
        formData.append('Location', Location)
        formData.append('Longitude', Longitude)
        formData.append('Langitude', Langitude)
        formData.append('userID', props.ProfileItem.user)
        try {
            formData.append('coverimage', coverimage.image)
        } catch (error) {

        }

        axios
            .post(URL, formData, config)
            .then(res => {
                props.setUserResturents([...props.articles, res.data])
            })
            .catch((err) => console.log(err))

        setName("")
        setDescription("")
        setDistance("")
        setDelevaryFee("")
        setLocation("")
        setLongitude("")
        setLangitude("")
        setCoverimage("")
        document.querySelector(".res_add_form").reset()
    }

    const AddLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                //Get information about lon and lat
                console.log(position);

                axios.get("http://maps.google.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=false")
                    .then(res => {
                        console.log(res.data);
                    })
            })
        }
    }

    return (
        <div>
            <form className="res_add_form" onSubmit={NewRestorant}>
                <input type="file" accept="image/*"
                    onChange={uploadCover}
                />
                <div className="res_prevImage"></div>
                <input type="text" placeholder="Name"
                    onChange={e => setName(e.target.value)}
                />
                <textarea placeholder="Description"
                    onChange={e => setDescription(e.target.value)}
                />
                <input type="number" placeholder="Distance"
                    onChange={e => setDistance(e.target.value)}
                />
                <input type="number" placeholder="Delevary fee"
                    onChange={e => setDelevaryFee(e.target.value)}
                />
                <input type="text" placeholder="Location"
                    onChange={e => setLocation(e.target.value)}
                />
                <button className='location_button' onClick={AddLocation}>Add Location</button>

                

                {Name && Description && Distance && DelevaryFee && Location && coverimage ?
                    <button className="res_add_button">Add</button>
                    :
                    <button className="res_add_button" disabled>Add</button>
                }
            </form>
        </div>
    )
}

export default ResturentAddForm
