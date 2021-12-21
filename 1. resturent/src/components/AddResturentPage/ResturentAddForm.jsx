import React, {useState} from 'react'
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
    }

    //Add new resturent
    const NewRestorant = async (e) => {
        e.preventDefault();

        URL = `${BackendLink}/api/restaurants/add/resturent/`
        const config = { headers: { 'Content-Type': 'multipart/form-data' }}

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
        .catch((err) => console.log(err))
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
                <input type="text" placeholder="Distance" 
                    onChange={e => setDistance(e.target.value)}
                />
                <input type="text" placeholder="Delevary fee" 
                    onChange={e => setDelevaryFee(e.target.value)}
                />
                <input type="text" placeholder="Location" 
                    onChange={e => setLocation(e.target.value)}
                />
                <input type="text" placeholder="langatude" 
                    onChange={e => setLangitude(e.target.value)}
                />
                <input type="text" placeholder="longatude" 
                    onChange={e => setLongitude(e.target.value)}
                />
                <input type="file" accept="image/*"
                    onChange={uploadCover}
                />

                <button
                    className="res_add_button"
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default ResturentAddForm
