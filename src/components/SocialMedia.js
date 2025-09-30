// src/components/SocialMedia.js
import React from "react";

function SocialMedia({ platform, link }) {
  function redirect() {
    window.open(link, "_blank");
  }

  return (
    <button onClick={redirect}>{platform}</button>
  );
}

export default SocialMedia;
