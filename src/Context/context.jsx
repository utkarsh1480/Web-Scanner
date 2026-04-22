// Context/context.js
import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const PageSpeedContext = createContext();

export const PageSpeedProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <PageSpeedContext.Provider value={{ data, setData, loading, setLoading, error, setError }}>
      {children}
    </PageSpeedContext.Provider>
  );
};

PageSpeedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageSpeedProvider;
