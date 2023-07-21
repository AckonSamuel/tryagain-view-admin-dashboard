/* eslint-disable camelcase */
import { useSelector, shallowEqual } from "react-redux";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Data({ instrument }) {
  const { attributes } = instrument;

  const {
    description,
    manufacturing_year,
    model,
    price,
    instrument_name,
    resolution,
    range,
    categories,
    labs,
  } = attributes;

  const categoryList = useSelector((state) => state.categoryFetch.category, shallowEqual);
  const labList = useSelector((state) => state.labFetch.lab, shallowEqual);

  return (
    <MDBox>
      <MDTypography variant="h1" component="h2">
        {instrument_name}
      </MDTypography>
      <MDTypography variant="body2" color="text.secondary" className="first-data">
        Description: {description} <br />
        Model: {model} <br />
        Manufacturing_year: {manufacturing_year} <br />
        Price: {price} <br />
        Resolution: {resolution} <br />
        Range: {range} <br />
        labs:{" "}
        {labs.map((lab) => (
          <>
            <span>{labList.find((l) => l.id === lab)?.attributes.lab_name}</span>
            <br />
          </>
        ))}{" "}
        <br />
        categories:{" "}
        {categories.map((cat) => (
          <>
            <span>{categoryList.find((c) => c.id === cat)?.attributes.category_name}</span>
            <br />
          </>
        ))}{" "}
        <br />
      </MDTypography>
    </MDBox>
  );
}

Data.propTypes = {
  instrument: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default Data;
