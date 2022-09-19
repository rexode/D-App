import React, { useEffect, useState, useRef } from "react";
import {Header} from "./layout"
import {Body} from "./layout"

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { create } from "ipfs-http-client";
import background from "./imagenes/background1.jpg";


export const StyledButton = styled.button`
  padding: 8px;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claiminnft,setClaiminnft]=useState(false);
  const [feedback,setFeedback]=useState("eyyyy");
  const [balance,setbalance]=useState("----");
  const [cost,setcost]=useState("----");



 
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

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, dispatch]);

  return ( 
<div style={{ backgroundImage: `url(${background})` }}>
    <div className="App">
      <Header/>
      <Body/>
      <s.Screen>
      <header/>
    </s.Screen>
{blockchain.account === "" || blockchain.smartContract === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the Blockchain</s.TextTitle>
          <s.SpacerSmall />
          <StyledButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            CONNECT
          </StyledButton>
          <s.SpacerSmall />
          {blockchain.errorMsg !== "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
          <s.TextTitle style={{ textAlign: "center" }}>
            {feedback} 
          </s.TextTitle>
          <s.TextTitle>{cost}</s.TextTitle>
          <StyledButton  
          disabled={claiminnft ? 1:0 }
            onClick={(e) => {
              e.preventDefault();
              claimNft();
            }}
          >
            {claiminnft? "busy":"claim"}   
          </StyledButton>
        </s.Container>
        
        
      )}
      {blockchain.account === "" || blockchain.smartContract === null ? (
                  <s.TextTitle>hi</s.TextTitle>

      ) : (
        <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
          <s.TextTitle style={{ textAlign: "center" }}>
           mirar balance 
          </s.TextTitle>
          <s.TextTitle>{balance}</s.TextTitle>
          <StyledButton  
          disabled={claiminnft ? 1:0 }
            onClick={(e) => {
              e.preventDefault();
              getBalance()
            }}
          >
            {claiminnft? "busy":"claim"}   
          </StyledButton>
        </s.Container>
        
        
      )}
    </div>
    </div>
  );
}

export default App;
