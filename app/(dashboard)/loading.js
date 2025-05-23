import React from "react";

export default function loading() {
    return (
        <div className="row align-items-center">
            <div className="col-md-3">
                <div
                    className="skeleton-box bg-p-grey-12 rounded mb-3"
                    style={{ height: "30px", width: "100%" }}
                ></div>
            </div>
            <div className="col-md-3 ms-auto">
                <div
                    className="skeleton-box bg-p-grey-12 rounded mb-3"
                    style={{ height: "20px", width: "100%" }}
                ></div>
            </div>
            <div className="col-12 mt-4">
                <div className="card-table-body">
                    <div className="row pt-4 pb-3">
                        <div className="col-md-4">
                            <div
                                className="skeleton-box bg-p-grey-12 radius-10"
                                style={{ height: "35px", width: "100%" }}
                            ></div>
                        </div>
                        <div className="col-md-2 ms-auto">
                            <div
                                className="skeleton-box bg-p-grey-12 rounded"
                                style={{ height: "35px", width: "100%" }}
                            ></div>
                        </div>
                    </div>
                    <div
                        className="skeleton-box bg-p-grey-12 radius-12 mb-3"
                        style={{ height: "300px", width: "100%" }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
