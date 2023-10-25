import React from "react";
import { Link } from "react-router-dom";

function Routes(props) {
  return (
    <>
      <div className="route-box">
        <div className="route-content">
          <h2>Route 1</h2>
        </div>
          <Link to="/show">
        <div className="route-choose">
            <div>
              <TbBus size={50} color="#f88243" />
              <TbArrowBadgeRightFilled size={50} color="f6ae2d" />
            </div>
        </div>
          </Link>
      </div>
    </>
  );
}

export default Routes;
