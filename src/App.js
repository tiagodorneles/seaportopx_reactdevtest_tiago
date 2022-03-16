import "./App.css";
import React, { useEffect, useState } from "react";
import LineChart from "./components/LineChart";

function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(false);
  const [chartData, setChartData] = useState();

  const TOKEN_URL = "https://domainservices.dhigroup.com/api/tokens";
  const TIMEENTRIES_URL =
    "https://domainservices.dhigroup.com/api/timeseries/mclite-timeseries/Telemetry%7CCatchment%20rainfall%7C6790_HUDINJA_SKOFJA_VAS_Rainfall.dfs0%20%5Bweighted%5D/values";
  const CREDENTIALS = { id: "demo", password: "demo" };

  const getToken = async () => {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      body: JSON.stringify(CREDENTIALS),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setToken(data.accessToken.token);
  };

  const fetchChartData = async (token) => {
    const response = await fetch(TIMEENTRIES_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    const labels = [];
    const amounts = [];
    let lastAmount = 0;

    data.forEach((t) => {
      if (t[1] > 0 && t[1] !== null && t[1] != lastAmount) {
        labels.push(
          new Date(t[0]).toLocaleDateString([], {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        amounts.push(t[1]);
        lastAmount = t[1];
      }
    });
    setChartData({ labels, amounts });
    setLoading(false);
  };

  useEffect(() => {
    if (!token) {
      getToken();
    } else if (!chartData) {
      fetchChartData(token);
    }
  });

  return (
    <>
      {loading && <p>Chart data is loading...</p>}
      {!loading && <LineChart chartData={chartData}></LineChart>}
    </>
  );
}

export default App;
