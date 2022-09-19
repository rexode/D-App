import React from "react";
import AboutUs from "../AboutUs";
import Intro from "../Intro/Intro";
import OtherInfo from "../OtherInfo/OtherInfo";
import Mint from "../Mint/Mint"

function Body(){

    return(
        <section className="Body">
            <Intro/>
            <AboutUs/>
            <OtherInfo/>
            <Mint/>
        </section>
    )

}
export default Body;