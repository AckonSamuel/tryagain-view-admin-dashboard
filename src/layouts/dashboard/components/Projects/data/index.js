/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import Actions from "./Actions";
// @mui material components

export default function data() {
  return {
    columns: [
      { Header: "key", accessor: "key", align: "left" },
      { Header: "Club name", accessor: "club", width: "45%", align: "left" },
      { Header: "Status", accessor: "clubstatus", width: "10%", align: "left" },
      { Header: "Application Type", accessor: "type_app", align: "center" },
      { Header: "Actions", accessor: "action", width: "30%", align: "left" },
    ],

    rows: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({
      key: item,
      club: "Debate Club",
      clubstatus: "ongoing",
      type_app: "Registration",
      action: <Actions />,
    })),
  };
}
