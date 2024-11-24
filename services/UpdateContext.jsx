import React, { createContext, useState } from "react";

export const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);

    const manager = {
        update,
        setUpdate,
    };

  return (
    <UpdateContext.Provider value={manager}>
      {children}
    </UpdateContext.Provider>
  );
};
