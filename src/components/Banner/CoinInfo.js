import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, ThemeProvider, CircularProgress, createTheme } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext";
import { HistoricalChart } from "../../config/api";
import {Line } from "react-chartjs-2"
import SelectButton from "./SelectButton.js"
import {CategoryScale} from 'chart.js'; 
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'


const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

const CoinInfo = ({coin}) => {
    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(1)
    const { currency } = CryptoState();
    const [flag, setflag] = useState(false)
    // console.log(coin)



//   const useStyles = makeStyles((theme) => ({
//     container: {
//       width: "75%",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       marginTop: 25,
//       padding: 40,
//       [theme.breakpoints.down("md")]: {
//         width: "100%",
//         marginTop: 0,
//         padding: 20,
//         paddingTop: 0,
//       },
//     },
//   }));

//   const classes = useStyles();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    console.log(data)
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  
    // eslint-disable-next-line
  }, [days])
  useEffect(() => {
    fetchHistoricData();
  
    // eslint-disable-next-line
  }, [currency])
  



  return (
    <ThemeProvider theme={darkTheme}>
      <div className="infocontainer">
        {!historicData | (flag === false) ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
