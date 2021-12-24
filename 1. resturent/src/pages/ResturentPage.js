import { React } from 'react';
import FoodItems from '../components/ResturentPageComponents/FoodItems';
import ResturentBillBord from '../components/ResturentPageComponents/ResturentBillBord';
import HiddenHeader from '../Ulitilyts/HiddenHeader'
import Header from '../Ulitilyts/Header';
import HeaderResponsive from '../Ulitilyts/HeaderResponsive';
import FilterResponsive from '../components/HomePageComponents/FilterResponsive';


const ResturentPage = (props) => {
    //Initial render
    return (
        <>
            <Header id="hide"/>

            <HeaderResponsive />
            <div className="resturent">
                <ResturentBillBord />
                <FilterResponsive />
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