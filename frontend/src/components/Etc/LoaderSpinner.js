import React from 'react';
import Loader from "react-loader-spinner";

const LoaderSpinner = () => {
    return (
        <div className="main"
             style={{
                 width: "100%",
                 height: "100",
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center"
             }}
        >
            <Loader type="ThreeDots"
                    color="#00a2df"
                    // color="#4f9cba"
                    height="70" width="70" />
        </div>
    )
}

export default LoaderSpinner;