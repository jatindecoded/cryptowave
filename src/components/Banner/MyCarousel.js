import React, { useState, useEffect } from "react";
import { CryptoState } from "../../CryptoContext";
import axios from "axios";
import { TrendingCoins, Trending, Coini } from "../../config/api";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "@material-ui/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function numberWithCommas(x) {
  if (x)
  {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }
  return undefined
}
const MyCarousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const fetchTrending = async () => {
    const { data } = await axios.get(Trending());

    setTrending(data.coins);
    console.log(data.coins);
  };

  useEffect(() => {
    fetchTrending();
    //   console.log("iuiu")

    //   return () => {
    //     second
    //   }
  }, [currency]);

  //   console.log(trending);
  //   const items = Object.keys(trending).map(key => {
  //     return (
  //       <Link className="carouselitem" to={"/coins/${coin.item.id}"}>
  //         {/* <img src={trending[key]?.image} alt={trending[key].name} height="80"/>
  //         kjkj
  //         {trending[key]} */}
  //         <img src={coin.item.large} alt={coin.item.name} height="80" />

  //       </Link>
  //     );
  //   });
  // const items = trending.map((coin) => (
  //   <Link
  //     className="carouselitem"
  //     to={"/coins/${coin.item.id}"}
  //     key={coin.item.id}
  //   >
  //     <img src={coin.item.large} alt={coin.item.name} height="80" />
  //     {coin.item.name}
  //   </Link>
  // ));

  // const responsive = {
  //   0: {
  //     items: 2,
  //   },
  //   512: {
  //     items: 4,
  //   },
  // };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const history = useHistory();

  return (
    <>
      <Carousel
        // transitionDuration={500}
        centerMode
        className=" p-4 "
        arrows={false}
        swipeable={true}
        responsive={responsive}
        autoPlay
        autoPlaySpeed={2000}
        transitionDuration={5}
        infinite={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        draggable={true}
      >
        {trending.map((coin) => {
          // let profit =
          // console.log(axios.get(Coini(coin.item.id)))
          return (
            // return
            <Link
              to={"/coins/${coin.item.id}"}
              onClick={() => history.push(`/coin/${coin.item.id}`)}
              key={coin.item.id}
              className=" justify-content-around text-center text-white text-decoration-none linki"
            >
              <div className="m-4 text-center ">
                <img
                  src={coin.item.large}
                  alt={coin.item.name}
                  height={80}
                  className="rounded "
                />
                <p className=" pt-4 fw-bold">{coin.item.symbol}</p>
                <div className=" fw-bold">
                  {symbol}{" "}
                  {/* {numberWithCommas((coin.item.price_btc * 2544642).toFixed(3))} */}
                  {(coin.item.price_btc * 2544642).toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 5 })}
                  {/* {console.log(Coini(coin.item.id).inr_24h_change)} */}
                </div>
                
                <div className=" small">
                  Market Cap Rank: {coin.item.market_cap_rank}
                </div>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </>
  );

  // return (
  //   <div className="carousel border">
  //     <AliceCarousel
  //       activeIndex="0"
  //       autoPlay
  //       mouseTracking
  //       items={items}
  //       infinite
  //       autoPlayInterval={100}
  //       animationDuration={150}
  //       // duration={2000}
  //       // autoPlayStrategy="none"
  //       disableDotsControls
  //       disableButtonsControls
  //       responsive={responsive}
  //     />
  //   </div>
  // );
};

// const MultiItemCarousel = () => {

//   };

export default MyCarousel;
