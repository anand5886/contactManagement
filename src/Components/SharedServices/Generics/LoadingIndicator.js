import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./spinner.css";

export const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker({ delay: 50 });
    //alert(promiseInProgress);
    return (
        promiseInProgress &&
        (
            <div className="spinner">
                {/* <div className='overlay-box'> */}
                    <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
                {/* </div> */}
            </div>
        )
    );
};

