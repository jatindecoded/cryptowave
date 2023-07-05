// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Router } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Coin from "./pages/CoinPage";
import { makeStyles } from '@material-ui/core';


function App() {
  // const useStyles = makeStyles(() => ({
  //   App: {
  //     backgroundColor: "#14161a",
  //     color: "white",
  //     minHeight: "100vh",
  //   },
  // }));

  // const classes = useStyles();

  return (
    <BrowserRouter>
      <div className="app ok">
        <Header></Header>
        {/* <Routes> */}
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/coin/:id" component={Coin} exact />
        {/* </Routes> */}
      </div>
    </BrowserRouter>
    // <BrowserRouter>
    //   <Header/>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="home" element={<Home />} />
    //     <Route path="coin/:id" element={<Coin />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
