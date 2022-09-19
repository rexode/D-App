import React,{ useEffect, useState, useRef }  from "react";
import { Navbar } from "..";
import "./Header.css";
import logo from "../../imagenes/logo.png"
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import styled from "styled-components";
export const StyledButton = styled.button`
  padding: 8px;
`;

function Header () {
  const [Login,setLogin]=useState("Connect to ETH");
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
    return (
      <section className="header">
        <section className="header-top">
          <section className="header-top__logo">
            <a href="/" className="header-logo"><img src={logo}></img></a>
          </section>
          <section className="header-top__navbar">
            <section className="header-top__navigation">
              <Navbar />
            </section>
          </section>
          <section className="Connect">
          {blockchain.account === "" || blockchain.smartContract === null ? (
            <s.Container flex={1} ai={"center"} jc={"center"}>  
              <a  className="connect" onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                }}
                >Connect to Eth</a>
              {blockchain.errorMsg !== "" ? (
                <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
              ) : null}
            </s.Container>
          ) : (<s.Container flex={1} ai={"center"} jc={"center"}>  
          <a  className="connect" onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
            >Connected to Eth</a></s.Container>) }
            
          </section>
          
            
          
        </section>
        
      </section>
    )
  }
  
  export default Header;