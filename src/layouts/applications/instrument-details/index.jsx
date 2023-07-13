import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import PropTypes from "prop-types";
import Stack from "@mui/material/Container";
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DeleteInstrument from "../delete-instrument";
import UpdateInstrument from "layouts/updates";
import Image from "./data/Image";
import Data from "./data";
import Return from "./return";


function InstrumentDetails() {
  const dispatch = useDispatch();
  const { instrument, id } = useSelector((state) => state.instrumentFetch, shallowEqual);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Return />
        <DeleteInstrument />
        <UpdateInstrument />
        {instrument
          .filter((item) => item.id === id )
          .map((item) => (
            <Stack direction="row">
              <Image
                id={item.id}
                itemImage={
                  item.attributes.instrument_photos_url.length > 0
                    ? item.attributes.instrument_photos_url[0]
                    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                }
              />
              <Data instrument={item} />
            </Stack>
          ))}
      </MDBox>
    </DashboardLayout>
  );
}

InstrumentDetails.propTypes = {
  instruments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default InstrumentDetails;
