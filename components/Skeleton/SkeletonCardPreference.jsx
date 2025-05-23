import React from "react";
import SkeletonItem from "./SkeletonItem";

export default function SkeletonCardPreference() {
  return (
    <div
      className="skeleton-box radius-12" style={{ height: "143px", width: "100%" }}>
      <div className="vstack justify-content-between" style={{ height: "143px", width: "100%", padding: "15px 18px" }}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div>
              <SkeletonItem
                className="bg-p-grey-12 rounded-circle"
                style={{ height: "20px", width: "20px" }}
              />
            </div>
            <SkeletonItem
              className="bg-p-grey-12 radius-10"
              style={{ height: "12px", width: "100px" }}
            />
          </div>
          <div>
            <SkeletonItem
              className="bg-p-grey-12 radius-11"
              style={{ height: "25px", width: "55px" }}
            />
          </div>
        </div>
        <div>
          <SkeletonItem
            className="bg-p-grey-12 radius-10"
            style={{ height: "12px", width: "100px" }}
          />
          <div className="pt-1">
            <div>
              <SkeletonItem
                className="bg-p-grey-12 radius-10"
                style={{ height: "12px", width: "60px" }}
              />
            </div>
            <div>
              <SkeletonItem
                className="bg-p-grey-12 radius-10"
                style={{ height: "12px", width: "100px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
