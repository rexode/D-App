import React from "react";
import './Intro.css';
import background from "../../imagenes/FondoIntro.png";
import image from "../../imagenes/ImagenIntro.png";

function Intro(){

    return(
        <div classname="Background" style={{ backgroundImage: `url(${background})` }}>
        <section className="Intro">
            <section className="Text">
                <section className="Title">
                    <text>BEST NFT EVER
                    </text>
                </section>
                <section className="Description">
                    <text>COOL DIGITAL ART
                    </text>
                </section>
                <section className="textDescription">
                    <text>A brand new community of Crypto art that aims<br/> to do great and innovative projects by creating a community<br/> to bring the users closer to quality and unique art.
                    <br/> Join the community for a chance of getting an nft for free.
                    </text>
                </section>
            </section>
            <section className="Image">
            <a className="Image"><img src={image}></img></a>
            
            </section>
        </section>
        </div>
    )


}
export default Intro;