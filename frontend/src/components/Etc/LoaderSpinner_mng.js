import React from 'react';
import Loader from "react-loader-spinner";

const LoaderSpinner = () => {
    return (
        <div className="spinner"
             style={{
                 width: "100%",
                 height: "100",
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 top: "10%",
                 position:"fixed",
                 right: "0"
             }}
        >
            <Loader type="TailSpin"
                    color="#252830"
                    height={50} width={50} />
        </div>
    )
}

export default LoaderSpinner;