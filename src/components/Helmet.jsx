import React from "react";

const Helmet = ({ title, children }) => {
  document.title = `${title} | PetShop`;
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default Helmet;