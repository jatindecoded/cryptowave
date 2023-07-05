import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@material-ui/core";
import { AppBar, Select, MenuItem } from "@material-ui/core";
// import { History } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  //   const useStyles = makeStyles(() => ({
  //     title: {
  //       flex: 1,
  //       color: "gold",
  //       fontFamily: "Archivo",
  //       cursor: "pointer",
  //     },
  //   }));

  //   const classes = useStyles();
  const darktheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  
  
  const { currency, setCurrency } = CryptoState()
//   console.log(currency)
  const history = useHistory();
  return (
    <ThemeProvider theme = {darktheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              className="title fw-bold"
              onClick={() => history.push("/")}
            >
              CryptoWave 🚀
            </Typography>
              <span className="m-4 fw-bold text-secondary small">Made with ❤️ in India</span>
            {/* <div className="title"> asodbsob</div> */}
            <Select value = {currency} onChange = { (e) => {
                setCurrency(e.target.value)

            } }variant="outlined" 
            // className="border"
            // label="Currency"
            style={
                {
                    width: 100,
                    height: 30,
                    marginRight: 10
                }
            }>
              <MenuItem value="USD">USD - $</MenuItem>
              <MenuItem value="GBP">GBP - £</MenuItem>
              <MenuItem value="EUR">EUR - €</MenuItem>
              <MenuItem value="JPY">JPY - ¥</MenuItem>
              <MenuItem value="INR">INR - ₹</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
