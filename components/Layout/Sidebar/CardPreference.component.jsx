"use effect";
import SkeletonCardPreference from "@/components/Skeleton/SkeletonCardPreference";
import { ucFirst } from "@/utils/Libs/snippet";
import Image from "next/image";
import { dateFormatToID } from "@/utils/Helpers/Helper";

function CardUserComponent({ styles = {} }) {

  return (
    <>
      <div className={`section-card ${styles.sectionCard ?? ""}`}>
          <div className="card-preference vstack justify-content-between">
              <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                      <div className="border p-1 rounded-circle">
                          <Image
                              height="22"
                              width="22"
                              src={`/placeholder.png`}
                              className="object-cover-center rounded-circle"
                              alt="Logo Profile"
                              style={{ height: "22px", width: "22px" }}
                          />
                      </div>
                      <div className="font-weight-500 font-size-12 text-white">
                          Anto Wiranto
                      </div>
                  </div>
                  <div>
                      <button
                          className="btn bg-white font-size-9 font-weight-500 radius-11 text-p-blue-21"
                          style={{ padding: "3px 9px" }}
                      >
                          Change
                      </button>
                  </div>
              </div>
              <div>
                  <div className="font-size-13 font-weight-600 text-white">
                      {ucFirst('Anto' ?? "-")}
                  </div>
                  <div className="font-size-11 font-weight-600 text-white mt-1">
                      Administator
                  </div>
                  <div className="font-size-8 font-weight-600 text-p-blue-10">
                      {dateFormatToID('2022-01-01' ?? "-")}
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}

export default CardUserComponent;
