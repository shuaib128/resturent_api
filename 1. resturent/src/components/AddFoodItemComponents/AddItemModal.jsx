import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import axios from 'axios';
import { BackendLink } from '../../Api/BackendLink'

const AddItemModal = (props) => {
    const [IsSubmit, setIsSubmit] = useState(false)

    var file_structure_object = []
    var one = []

    const create_type = (id) => {
        setIsSubmit(true)
        /**
         * Make a new form for a new type
         */
        var types_dom = document.querySelector(`.types_${id}`)
        types_dom.innerHTML += `
            <form id="type_div">
                <input class="main_type" placeholder="type" />
            </form>
            <button class="add_btn">Add</button>
        `

        /**
         * create a subtipe with in the main type
         */
        var sub_input_btns = document.querySelectorAll(".add_btn")
        for (var i = 0; i < sub_input_btns.length; i++) {
            sub_input_btns[i].addEventListener('click', function (e) {
                e.target.previousSibling.previousSibling.innerHTML += `
                    <form>
                        <input class="main_sub_type" placeholder="sub-type" />
                        <input class="main_sub_price" type="number" placeholder="price" />
                    </form>
                `
            }, false)
        }
    }


    /**Submit after all input filled */
    const submit_types = (id) => {
        var forms = document.querySelectorAll(`#type_div`)

        for (var i = 0; i < forms.length; i++) {
            one = []
            var inputs_array = Array.from(forms[i].getElementsByTagName("input"))

            for (var j = 0; j < inputs_array.length; j++) {
                one.push(inputs_array[j].value)
            }
            file_structure_object.push(one)
        }
        console.log(JSON.stringify(file_structure_object));
        axios.post(`${BackendLink}/api/restaurants/add/itemstr/`, {
            item_id: id,
            structor: JSON.stringify(file_structure_object)
        })
    }

    return (
        <div className={"food_modal food_modal_" + props.item.id}>
            <img className='modal_image' src={props.item.image} alt="model" />
            <div className="foodModal_des">
                <p className='food_modal_title'>{props.item.title}</p>
                <p className='food_modal_des'>{props.item.body}</p>

                <div className="custom_forms">
                    <div className={"types_ types_" + props.item.id}></div>

                    <p className='adextransp'>Add Extras</p>
                    <button className='create_type create_round'
                        onClick={() => create_type(props.item.id)}
                    >
                        <Plus color="white" size={20} />
                    </button>

                    {IsSubmit ?
                        <button className='create_type'
                            onClick={() => submit_types(props.item.id)}
                        >
                            Submit
                        </button> :
                        <div></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddItemModal
