import React, {useState, useEffect} from "react";
import { Container } from "@material-ui/core";
import MyCarousel from "./MyCarousel"

const Banner = () => {
  const [Loopno, setLoopno] = useState(0);
  const toRotate = [
    "CryptoCurrency",
    "Bitcoin",
    "Ethereum",
    "DogeCoin",
    "Cardano",
    "Tether",
    "Solana"
  ];
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);
  const [text, setText] = useState("");
  const [Pt, setPt] = useState("");
  const period = 150;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);
  useEffect(() => {
    let dotter = setInterval(() => {
      dot();
    }, 150);

    return () => {
      clearInterval(dotter);
    };
  }, [Pt]);
  let x = 0;
  const dot = () => {
    x = 1 - x;
    if (x === 1) {
      setPt("|");
    } else {
      setPt(".");
    }
  };
  const tick = () => {
    let i = Loopno % toRotate.length;
    let fulltext = toRotate[i];

    let updatedtext = isDeleting
      ? fulltext.substring(0, text.length - 1)
      : fulltext.substring(0, text.length + 1);
    setText(updatedtext);

    if (delta === 2000) {
      setDelta(period);
    }
    setDelta((prevdelta) => {
      return prevdelta / 1.09;
    });

    if (!isDeleting && updatedtext === fulltext) {
      setIsDeleting(true);
      setDelta(2000);
    } else if (isDeleting && updatedtext === "") {
      setIsDeleting(false);
      setLoopno(Loopno + 1);
      setDelta(period);
    }
  };
  return (
    <div className="banner">
      <Container className="bannerCont">
        <div className="tagline h1">CryptoWave 🚀</div>
        <div className="text-center slogan fw-bold">
          Ride the waves of {text} with CryptoWave!
          {/* <span className="ptpt">{Pt}</span> */}
           
        </div>
        <MyCarousel></MyCarousel>
      </Container>
    </div>
  );
};

export default Banner;
