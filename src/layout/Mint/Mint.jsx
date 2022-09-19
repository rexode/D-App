import React, { useEffect, useState, useRef } from "react";
import "./Mint.css"
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import styled from "styled-components";
export const StyledButton = styled.button`
  padding: 8px;
`;
function Mint(){
    const [cost,setcost]=useState("----");
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [claiminnft,setClaiminnft]=useState(false);
    const [feedback,setFeedback]=useState("eyyyy");
    const [balance,setbalance]=useState("----");

    const getBalance =() =>{
        //var accounts =blockchain.web3.eth.getAccounts();
        //var balance = blockchain.web3.eth.getBalance(accounts[0])
        //var account = blockchain.web3.eth.accounts[0];
        blockchain.web3.eth.getBalance(blockchain.account, function(err, result) {
          if (err) {
            console.log(err)
          } else {
            setbalance(blockchain.web3.utils.fromWei(result, "ether"))
            setcost(blockchain.web3.utils.toWei((0.05).toString(),"ether"))
          }
        })
      }
      const claimNft =() =>{
        blockchain.web3.eth.getBalance(blockchain.account, function(err, result) {
          if (err) {
            console.log(err)
          } else {
            if(blockchain.web3.utils.fromWei(result, "ether")>0.05 ){
            setbalance(blockchain.web3.utils.fromWei(result, "ether"))
            setcost(0.05)
        setClaiminnft(true);
        blockchain.smartContract.methods.mint().send({
          from:blockchain.account,
          value:blockchain.web3.utils.toWei((0.05).toString(),"ether")  
        }).once("error",(err)=>{
           setClaiminnft(false);
           feedback("error");
           console.log(err);
        }).then((receipt)=>{
          setFeedback("success")
          setClaiminnft(false);
        }) 
      }
        }
        })
      };
    return(
        
        <section className="Intro">
            <section className="MintText">
                <section className="MintTitle">
                    <text>MINT
                    </text>
                </section>
                <section className="MintDescription">
                    <text>COOL DIGITAL ART
                    </text>
                </section>
                <section className="MintTextDescription">
                    <text>A brand new community of Crypto art that aims<br/> to do great and innovative projects by creating a community<br/> to bring the users closer to quality and unique art.
                    <br/> Join the community for a chance of getting an nft for free.
                    </text>

                </section>
                <section className="MintButton">
                {blockchain.account === "" || blockchain.smartContract === null ? (
                
                <s.Container flex={1} ai={"center"} jc={"center"}>  
                <a   onClick={(e) => {
                }}
                >Connect to Eth</a>
                </s.Container>
            ) : (<s.Container flex={1} ai={"center"} jc={"center"}>  
                <a   onClick={(e) => {
                  e.preventDefault();
                  claimNft()
                }}
                >Soon!!</a>
            </s.Container>) }
                </section>
            </section>
        </section>
    
    )


}
export default Mint