import { React } from 'react';
import FoodItems from '../components/ResturentPageComponents/FoodItems';
import ResturentBillBord from '../components/ResturentPageComponents/ResturentBillBord';
import HiddenHeader from '../Ulitilyts/HiddenHeader'
import Header from '../Ulitilyts/Header';

const ResturentPage = (props) => {
    //Initial render
    return (
        <>
            <Header id="hide"/>
            <div className="resturent">
                <ResturentBillBord />
                <HiddenHeader
                    ProfileItem={props.ProfileItem}
                    UserItem={props.UserItem}
                />
                <FoodItems />
            </div>
        </>
    )
}

export default ResturentPage