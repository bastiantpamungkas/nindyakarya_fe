import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { queryApi } from "@/utils/Libs/axios";
import './Tooltip.css'; // Importing the CSS file for styling

const Tooltip = ({ children, data, width }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);
  
  const cardsToolTipColor = [
    { color: "#194BFB", valueKey: 1 },
    { color: "#F6C500", valueKey: 2 },
    { color: "#DC51FF", valueKey: 3 }
  ];

  return (
    <div
      className="tooltip-container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      style={{ width: width}}
    >
      {children}
      {visible && 
        <div className="tooltip">
            <div>
                <div className="card shadow" style={{ width: "200px" }}>
                    <div className="card-body">
                        {data.map((item, index) => (
                            <div key={index} className="row">
                                <div className="col-md-2">
                                    <div style={{ borderRadius: "20px", width: "14px", height: "14px", 
                                        backgroundColor: cardsToolTipColor.find((color) => color.valueKey === item.id).color
                                    }}></div>
                                </div>
                                <div className="col-md-8">
                                    {item.name}
                                </div>
                                <div className="col-md-2">
                                    {item.total}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="card-footer text-center" onClick={() => setVisible(false) }>
                        <div style={{ color: "#7593FD", cursor: "pointer" }}>OK</div>
                    </div>
                </div>
            </div>
        </div>}
    </div>
  );
};

export default Tooltip;
