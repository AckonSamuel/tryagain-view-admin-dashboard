import React from "react";
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";

function RowEl() {
  return {
    club: "Debate Club",
    clubstatus: "ongoing",
    type_app: "Registration",
    completion: (
      <MDBox width="8rem" textAlign="left">
        <MDProgress value={60} color="info" variant="gradient" label={false} />
      </MDBox>
    ),
  };
}

export default RowEl;
