import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";
import AddInstrument from "./new-instruments";

function Instruments() {
  const { instrument, searchArr } = useSelector((state) => state.instrumentFetch, shallowEqual);
  const instruments = searchArr.length > 0 ? searchArr : instrument;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Grid container spacing={3}>
          <Grid item sx={{ width: "100%", mb: 5 }}>
            <AddInstrument />
          </Grid>
          {instruments.map((item) => (
            <Grid key={item.id} item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <SimpleBlogCard
                  title={item.attributes.instrument_name}
                  id={item.id}
                  action={{
                    type: "internal",
                    route: `/${item.attributes.instrument_name}`,
                    color: "primary",
                    label: "View",
                  }}
                  description={item.attributes.description}
                />
              </MDBox>
            </Grid>
          ))}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Instruments;
