import React from "react";
import OtherInfoImage from '../../imagenes/OtherInfo.png'
import './OtherInfo.css'

 function OtherInfo(){
    return (
    
        <section className="OtherInfo">
            
            <section className="OtherInfoText">
                <section className="OtherInfoTitle">
                    <text>OTHER INFO
                    </text>
                </section>
                <section className="OtherInfoList">
                    <text>To join the society, you will need to have an NFT/entry pass  to the society, there are several ways to get one.
                        <ol>
                            <li>1ºBy Buy it in the initial offer on our website.</li>
                            <li>2ºIn case of a large number of buyers, part of the collection of developers will be auctioned.</li>
                            <li>3ºBy Buy it in the secondary market of open sea.</li>
                            <li>4ºBy winning giveaways and future contests.</li>
                        </ol> <br/>
                            Number of NFTs minted initially.<br/>
                            Total:1100.<br/>
                            Initial Mint:1000.<br/>
                            The remaining 100 will be reserved by the developers for sale at auction, giveaways prizes or personal use (hiring or collaborations).
                    </text>
                </section>
            </section>
            <section className="OtherInfoImage">
            <a className="Image"><img src={OtherInfoImage}></img></a>
            
            </section>
        </section>
    )


 }
 export default OtherInfo;