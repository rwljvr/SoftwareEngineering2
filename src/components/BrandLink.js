// src/components/BrandLink.js
import React from "react";

function BrandLink({ brandID, brandName, brandURL }) {
  function openBrandSite() {
    window.open(brandURL, "_blank");
  }

  return (
    <div className="brand-link">
      <button onClick={openBrandSite}>{brandName}</button>
    </div>
  );
}

export default BrandLink;
