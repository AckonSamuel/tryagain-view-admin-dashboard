import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useForm } from "react-hook-form";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const thisyear = new Date().getFullYear();

export default function Settings() {
  const [thye, setThye] = useState(thisyear);
  const { register } = useForm();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card
        // elevation={9}
        sx={{
          marginTop: "2em",
        }}
      >
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="success"
        >
          <MDTypography variant="h6" color="white">
            Settings
          </MDTypography>
        </MDBox>
        <MDBox
          component="form"
          role="form"
          sx={{
            padding: "1em",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" color="green">
                Reset application year
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <FormControl variant="standard">
                <InputLabel htmlFor="start-year">Start year</InputLabel>
                <Select
                  {...register("start_year")}
                  required
                  id="start-year"
                  label="Start year"
                  variant="outlined"
                >
                  <MenuItem value={thye}>{thye}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="end-year">End year</InputLabel>
                <Select
                  {...register("end_year")}
                  required
                  id="end-year"
                  label="End year"
                  variant="standard"
                >
                  <MenuItem value={thye + 1}>{thye + 1}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="active-status">Active Status</InputLabel>
                <Select
                  {...register("is_active")}
                  required
                  id="active-year"
                  label="Active Status"
                  variant="standard"
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="success" type="submit" fullWidth>
              Update Club Info
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
