import React, { useState, useEffect } from "react";
import { CoinList } from "../config/api";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import { createTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";
import { numberWithCommas } from "../components/Banner/MyCarousel";
// import { CryptoState } from "../CryptoContext";

import {
  Container,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      borderRadius: "100px",
      border: "none",
      paddingLeft: "15px !important",
      "&.Mui-focused": {
        
        border: "none", // Remove the line when input is focused
      },
      "&.Mui-focused:after": {
        // paddingLeft: "10px",
        border: "none", // Remove the line when input is focused
      },
      "&.Mui-focused:before": {
        border: "none", // Remove the line when input is focused
      },
      "&:hover": {
        border: "none", // Remove the line on hover
      },
      "&:after":{
        border: "none",
      },
      "&:before": {
        border: "none", // Remove the default line
      }, // Adjust the value to increase or decrease the roundness
    },
  },
}));
const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  //   const useStyles = makeStyles({
  //     row: {
  //       backgroundColor: "#16171a",
  //       cursor: "pointer",
  //       "&:hover": {
  //         backgroundColor: "#131111",
  //       },
  //       fontFamily: "Montserrat",
  //     },
  //     pagination: {
  //       "& .MuiPaginationItem-root": {
  //         color: "gold",
  //       },
  //     },
  //   });

  //   const classes = useStyles();

  //   const { currency } = CryptoState();
  const fetchCoins = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
      
    } catch (error) {
      
    }
  };
  console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },

      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const [search, setSearch] = useState("");
  const history = useHistory();
  const [sortBy, setSortBy] = useState("Coin"); // Track the currently selected column to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // Track the sort order: "asc" (ascending) or "desc" (descending)
  const handleSort = (column) => {
    // If the clicked column is already the selected column, reverse the sort order
    if (column === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set it as the selected column and set the sort order to ascending
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  const renderSortIcon = () => {
    if (sortOrder === "asc") {
      return <span className="small">&#9650;</span>; // Ascending sort icon (upward triangle)
    } else {
      return <span className="small">&#9660;</span>; // Descending sort icon (downward triangle)
    }
  };
  const classes = useStyles();

  
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          style={{ margin: 18, fontFamily: "Archivo" }}
          className="p-3 fw-bold"
        >
          Cryptocurrency Prices by Market Cap 🚀
        </Typography>
        <TextField

          label="&#128269; Search For a Crypto Currency.."
          variant="filled"
          className={classes.root}
          style={{ marginBottom: 20, width: "100%", borderRadius: "100px", }}
          // InputProps={{
          //   className: "rounded",
          //   style: {
          //     borderRadius: "100px", // Adjust the value as per your preference
          //   },}}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="small text-end m-1 fw-bold" style={{color: "#b9b9b9"}}>Sort the Cryptocurrency Table by clicking on table headers. <span className="fw-bold" style={{cursor: "pointer", textDecoration: "underline"}} onClick={()=>{handleSort("Coin")}}>Try it!</span></div>
        <div>
          <TableContainer component={Paper} className="">
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow className="thead">
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Archivo",
                          }}
                          className="theader"
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                          onClick={() => handleSort(head)}

                        >
                          {head}{sortBy === head && renderSortIcon()}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .sort((a, b) => {
                      if (sortBy === "Coin") {
                        // Sort by coin name
                        return sortOrder === "asc"
                          ? a.name.localeCompare(b.name)
                          : b.name.localeCompare(a.name);
                      } else if (sortBy === "Price") {
                        // Sort by price
                        return sortOrder === "asc"
                          ? a.current_price - b.current_price
                          : b.current_price - a.current_price;
                      } else if (sortBy === "24h Change") {
                        // Sort by 24h change
                        return sortOrder === "asc"
                          ? a.price_change_percentage_24h -
                              b.price_change_percentage_24h
                          : b.price_change_percentage_24h -
                              a.price_change_percentage_24h;
                      } else if (sortBy === "Market Cap") {
                        // Sort by market cap
                        return sortOrder === "asc"
                          ? a.market_cap - b.market_cap
                          : b.market_cap - a.market_cap;
                      } else {
                        return 0;
                      }
                    })
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => history.push(`/coin/${row.id}`)}
                          // className={classes.row}
                          className="coinrow"
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {/* {numberWithCommas(row.current_price.toFixed(3))} */}
                            {/* {numberWithCommas(row.current_price.toFixed(3))} */}
                            {row.current_price.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 5 })}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(3)}%
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </div>

        {/* Comes from @material-ui/lab */}
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          //   classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
