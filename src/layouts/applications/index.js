import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Projects from "layouts/dashboard/components/Projects";

function Applications() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Projects />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Applications;
