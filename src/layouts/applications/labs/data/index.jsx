import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import LabActions from "../lab-actions";

const Data = () => {
  const { lab } = useSelector((state) => state.labFetch, shallowEqual);
  const labData = () =>
    lab.map((item) => ({
      lab_name: item.attributes.lab_name,
      location: item.attributes.lab_location,
      action: <LabActions id={item.id} />,
    }));

  return {
    columns: [
      { Header: "lab", accessor: "lab_name", width: "20%", align: "left" },
      { Header: "description", accessor: "location", width: "70%", align: "left" },
      { Header: "action", accessor: "action", align: "left" },
    ],

    rows: labData(),
  };
};

export default Data;
