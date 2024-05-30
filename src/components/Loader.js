import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <FontAwesomeIcon
        icon={faSpinner}
        className="text-4xl text-white animate-spin"
      />
    </div>
  );
};

export default Loader;
