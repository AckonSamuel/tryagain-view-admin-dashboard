/* eslint-disable camelcase */

import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Data({ instrument }) {
  const { attributes } = instrument;

  const { description, manufacturing_year, model, price, instrument_name } = attributes;

  return (
    <MDBox>
      <MDTypography variant="h1" component="h2">
        {instrument_name}
      </MDTypography>
      <MDTypography variant="body2" color="text.secondary" className="first-data">
        Description: {description} <br />
        Model: {model} <br />
        Manufacturing_year: {manufacturing_year} <br />
        Price: {price}
      </MDTypography>
    </MDBox>
  );
}

Data.propTypes = {
  instrument: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default Data;
