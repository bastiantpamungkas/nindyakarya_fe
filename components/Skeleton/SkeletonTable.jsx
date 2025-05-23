import React from "react";
import SkeletonItem from "./SkeletonItem";

function SkeletonTables({ lenghtColumn }) {
  const td = [1, 2, 3];
  return (
    <>
      {
        td.map((item, indexFirst) => (
          <tr key={indexFirst} className='table-tr'>
            {
              lenghtColumn.map((item, index) => (
                <td key={index} className='table-body-cell table-td'>
                  <SkeletonItem
                    className="radius-10 bg-p-grey-12"
                    style={{ height: "40px", minWidth: "100%" }}
                  />
                </td>
              ))
            }
          </tr>
        ))
      }
    </>
  );
}

export default SkeletonTables;
