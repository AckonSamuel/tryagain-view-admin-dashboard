/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import Actions from "./Actions";
// @mui material components

export default function data() {
  return {
    columns: [
      { Header: "key", accessor: "key", align: "left" },
      { Header: "Club name", accessor: "club", width: "45%", align: "left" },
      { Header: "Status", accessor: "clubstatus", width: "10%", align: "left" },
      { Header: "Application Type", accessor: "type_app", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
      { Header: "Actions", accessor: "action", width: "30%", align: "left" },
    ],

    rows: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({
      key: item,
      club: "Debate Club",
      clubstatus: "ongoing",
      type_app: "Registration",
      completion: (
        <MDBox width="8rem" textAlign="left">
          <MDProgress value={60} color="info" variant="gradient" label={false} />
        </MDBox>
      ),
      action: <Actions />,
    })),
    // {
    //   club: "IT CLUB",
    //   clubstatus: "submitted",
    //   type_app: "Registration",
    //   completion: (
    //     <MDBox width="8rem" textAlign="left">
    //       <MDProgress value={100} color="success" variant="gradient" label={false} />
    //     </MDBox>
    //   ),
    // },
    // {
    //   club: "Debate Club",
    //   clubstatus: "ongoing",
    //   type_app: "Registration",
    //   completion: (
    //     <MDBox width="8rem" textAlign="left">
    //       <MDProgress value={60} color="info" variant="gradient" label={false} />
    //     </MDBox>
    //   ),
    // },
    // {
    //   club: "Arsenal Club",
    //   clubstatus: "ongoing",
    //   type_app: "Renewal",
    //   completion: (
    //     <MDBox width="8rem" textAlign="left">
    //       <MDProgress value={20} color="info" variant="gradient" label={false} />
    //     </MDBox>
    //   ),
    // },
    // {
    //   club: "Sports Club",
    //   clubstatus: "ongoing",
    //   type_app: "Renewal",
    //   completion: (
    //     <MDBox width="8rem" textAlign="left">
    //       <MDProgress value={80} color="info" variant="gradient" label={false} />
    //     </MDBox>
    //   ),
    // },
    // {
    //   club: "ELEESA",
    //   clubstatus: "submitted",
    //   type_app: "Renewal",
    //   completion: (
    //     <MDBox width="8rem" textAlign="left">
    //       <MDProgress value={100} color="success" variant="gradient" label={false} />
    //     </MDBox>
    //   ),
    // },
    // {
    //   club: "Robotics Club",
    //   clubstatus: "ongoing",
    //   type_app: "Renewal",
    //   completion: (
    //     <MDBox width="8rem" textAlign="left">
    //       <MDProgress value={70} color="info" variant="gradient" label={false} />
    //     </MDBox>
    //   ),
    // },
  };
}
