import React from "react";
import SkeletonItem from "./SkeletonItem";

export default function SkeletonSideChat({ numElement = 8 }) {
  // const [i, setI] = useState([]);

  // const countElement = () => {
  //   let counter = [];
  //   for (let i = 0; i < numElement; i++) {
  //     counter.push(i);
  //   }
  //   setI(counter);
  // };
  // useEffect(() => {
  //   countElement();
  // }, []);
  return Array.from({ length: numElement }, (_, index) => (
    <div
      key={index}
      role="button"
      className="item-list-chat d-flex align-items-center gap-3 p-3 border-bottom-p-blue-12"
    >
      <div>
        <SkeletonItem
          style={{ height: "40px", width: "40px" }}
          className="rounded-circle bg-p-grey-8"
        />
      </div>
      <div>
        <div className="font-size-16 font-weight-600">
          <SkeletonItem
            className="radius-8 bg-p-grey-8"
            style={{ height: "18px", width: "170px" }}
          />
        </div>
        <div className="font-size-14 font-weight-400">
          <SkeletonItem
            className="radius-8 bg-p-grey-8"
            style={{ height: "15px", width: "80px" }}
          />
        </div>
      </div>
      <div className="font-size-12 ms-auto">
        <SkeletonItem
          className="radius-8 bg-p-grey-8"
          style={{ height: "15px", width: "25px" }}
        />
      </div>
    </div>
  ));
}
