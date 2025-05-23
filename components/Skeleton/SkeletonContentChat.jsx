import React from "react";
import SkeletonItem from "./SkeletonItem";

export default function SkeletonContentChat() {
  return (
    <div className="col-md-8 p-0">
      <div className="d-flex align-items-center gap-3 px-4 py-4">
        <div>
          <SkeletonItem
            className="rounded-circle bg-p-grey-8"
            style={{ height: "50px", width: "50px" }}
          />
        </div>
        <div>
          <div className="font-size-16 font-weight-600">
            <SkeletonItem
              className="radius-8 bg-p-grey-8"
              style={{ height: "24px", width: "250px" }}
            />
          </div>
          <div className="font-size-14 font-weight-400">
            <SkeletonItem
              className="radius-8 bg-p-grey-8"
              style={{ height: "15px", width: "100px" }}
            />
          </div>
        </div>
      </div>
      <div
        className="overflow-auto vstack gap-4 bg-p-grey-10 px-5 py-4 w-100 chat-content"
        style={{ height: "510px" }}>
        <div className="d-inline-block ms-auto" style={{ maxWidth: "400px" }}>
          <SkeletonItem
            className="radius-8 bg-p-grey-8"
            style={{ height: "40px", width: "300px" }}
          />
        </div>
        <div className="d-inline-block me-auto" style={{ maxWidth: "400px" }}>
          <SkeletonItem
            className="radius-8 bg-p-grey-8"
            style={{ height: "40px", width: "300px" }}
          />
        </div>
      </div>
      <div style={{background: "rgb(239, 242, 245)"}} className="d-flex align-items-center justify-content-center px-4 py-3 gap-3">
        <div
          contentEditable
          className="form-control-no-ring w-100 bg-p-white"
          placeholder="Ketik pesan..."
          id="_inputText_sendMessage"
          style={{ padding: "10px 20px" }}
        ></div>
        <div
          className="btn btn-p-blue-21 rounded-circle d-flex align-items-center justify-content-center p-2"
          role="button"
        >
          <i
            className="ip ip-send-arrow bg-p-white"
            style={{ height: "22px", width: "22px" }}
          ></i>
        </div>
      </div>
    </div>
  );
}
