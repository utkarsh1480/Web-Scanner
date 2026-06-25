// File: PageSpeedCards.js

import React, { useEffect, useState } from "react";

const PageSpeedCards = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url =
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://developers.google.com";

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setData(data.loadingExperience.metrics);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  console.log("App-Speed Data",data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={styles.container}>
      <h1>PageSpeed Metrics</h1>
      <div style={styles.cardContainer}>
        {data &&
          Object.keys(data).map((metricKey) => {
            const metric = data[metricKey];
            return (
              <div key={metricKey} style={styles.card}>
                <h2>{metricKey.replace(/_/g, " ")}</h2>
                <p>
                  <strong>Percentile:</strong> {metric.percentile}
                </p>
                <p>
                  <strong>Category:</strong> {metric.category}
                </p>
                <h4>Distributions</h4>
                <ul>
                  {metric.distributions.map((dist, index) => (
                    <li key={index}>
                      <strong>Range:</strong> {dist.min} - {dist.max || "∞"} ms
                      <br />
                      <strong>Proportion:</strong>{" "}
                      {(dist.proportion * 100).toFixed(2)}%
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default PageSpeedCards;
