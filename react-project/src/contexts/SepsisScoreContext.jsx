// import React, { createContext, useState } from 'react'

// const SepsisScoreContext = React.createContext();

// export default SepsisScoreContext

import React, { createContext, useState } from "react";

export const SepsisScoreContext = createContext();

export const SepsisScoreProvider = ({ children }) => {
  const [sepsisScores, setSepsisScores] = useState([]);

  return (
    <SepsisScoreContext.Provider value={{ sepsisScores, setSepsisScores }}>
      {children}
    </SepsisScoreContext.Provider>
  );
};
