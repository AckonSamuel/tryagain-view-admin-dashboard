import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import InstrumentActions from "../instrument-actions";

const Data = () => {
  const { instrument } = useSelector((state) => state.instrumentFetch, shallowEqual);
  const instrumentData = () =>
    instrument.map((item) => ({
      instrument_name: item.attributes.instrument_name,
      description: item.attributes.description,
      action: <InstrumentActions id={item.id} />,
    }));

  return {
    columns: [
      { Header: "Instrument", accessor: "instrument_name", width: "20%", align: "left" },
      { Header: "description", accessor: "description", width: "70%", align: "left" },
      { Header: "action", accessor: "action", align: "left" },
    ],

    rows: instrumentData(),
  };
};

export default Data;
