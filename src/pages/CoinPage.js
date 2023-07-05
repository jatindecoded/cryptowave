import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { CryptoState } from "../CryptoContext";
import { Typography } from "@material-ui/core";
// import ReactHtmlParser from "react-html-parser"
import HTMLReactParser from "html-react-parser";
import { numberWithCommas } from "../components/Banner/MyCarousel";
import CoinInfo from "../components/Banner/CoinInfo.js";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";

const CoinPage = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState("");

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    // console.log(data);
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, []);
  console.log(coin);

  // {console.log(coin?.market_data)}

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  // return (<>jjs</>);
  return (
    <div className="containerr">
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className="coinheading">
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className="coindesc m-3">
          {/* {ReactHtmlParser(coin?.description.en.split(". ")[0])}. */}
          {HTMLReactParser(coin?.description.en.split(". ")[0])}.
          {/* {require('html-react-parser')(
        '<em>foo</em>'
    )} */}
        </Typography>
        <div className="marketdata">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="coinheading">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Archivo",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="coinheading">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Archivo",
              }}
            >
              {symbol}&nbsp;
              {
                coin?.market_data.current_price[currency.toLowerCase()].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })
              }
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="coinheading">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Archivo",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
