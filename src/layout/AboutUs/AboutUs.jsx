import React from "react";
import AboutUsImage from "../../imagenes/AboutUs.png";
import './AboutUs.css';

function AboutUs(){
    return(
        <section className="AboutUs">
            <section className="AboutImage">
                    <a ><img src={AboutUsImage}></img></a>
            </section>
            <section className="AboutText">
                <section className="AboutTitle">
                    <text>ABOUT US
                    </text>
                </section>
                <section className="AboutTextDescription">
                    <text>We are a group of art enthusiasts who,after seeing the great potential of the nft world,want to bring an innovative idea: The creation of a transparent and active community where art lovers will have access to the following advantages.
                    <ol><br/>
                    <li>1ºUsers will have access to a private community where they will be able to chat, share and help other users projects.</li>
                    <li>2ºFurthermore , users can access to presales of own collections and collaborations with other projects, in advance and exclusively.</li>
                    <li>3º Artists who want to create NFT collections will be given support and help to facilitate the process. </li>
                    <li>4ºThe users who have the largest number of our NFT (except the initial collection) will have access to more advantages.</li>
                    <li>5ºThe server will have a DAO, so that users can participate in the future of the society.</li>
                    </ol>
                    </text>
                </section>
            </section>
                    
        </section>

    )
}
export default AboutUs
