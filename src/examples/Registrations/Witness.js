import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
import { useForm } from "react-hook-form";
// import { clubUpdate } from "redux/slices/clubs/updateSlice";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function UpdateClubForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const loading = useSelector((state) => state.clubUpdate.loading);
  const error = useSelector((state) => state.clubUpdate.error);

  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = () => {
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
      const data = getValues();
      const getClub = JSON.parse(localStorage.getItem("club"));

      if (getClub && getClub.data.id) {
        // dispatch(clubUpdate(data)).then((res) => {
        //   if (res.type === "club/clubUpdate/fulfilled") {
        //     navigate("/profile");
        //   }
        // });
      }
    }
  }, [submitted]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Paper
        elevation={9}
        sx={{
          padding: "2em",
          height: "100vh",
        }}
      >
        <Typography variant="h5">Witness</Typography>
        {error.length > 0 && (
          <MDBox mt={2}>
            <Typography variant="h5" color="red">
              Failed to update info. Please tryagain.
            </Typography>
          </MDBox>
        )}
        {loading ? (
          <MDBox mt={2}>
            <CircularProgress />
            <Typography variant="h5" color="green">
              Updating...
            </Typography>
          </MDBox>
        ) : (
          <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              spacing={3}
              sx={{
                height: "100%",
                mb: 2,
              }}
            >
              <Grid item xs={12}>
                <TextField
                  required
                  id="history"
                  multiline
                  label="Name of Patron"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  {...register("history")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  {...register("description")}
                  label="Office in KNUST"
                  fullWidth
                  multiline
                  autoComplete="family-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="meeting-time"
                  {...register("meeting_time")}
                  label="Phone Number"
                  fullWidth
                  multiline
                  autoComplete="meeting-time"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="signature-date"
                  label="Signature"
                  {...register("date")}
                  fullWidth
                  multiline
                  autoComplete="Signature"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="signature-date"
                  label="Date"
                  {...register("date")}
                  fullWidth
                  multiline
                  autoComplete="Signature"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="group">Constitution</InputLabel>
                  <Select
                    disabled={loading}
                    {...register("group")}
                    required
                    id="group"
                    variant="standard"
                    fullWidth
                  >
                    <MenuItem value="Religious">Approved</MenuItem>
                    <MenuItem value="Alumni">Not Approved</MenuItem>
                    <MenuItem value="Ethnic">Draft Only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <MDBox mt={2} mb={1}>
              <MDButton variant="gradient" color="success" type="submit" fullWidth>
                Update Club Info
              </MDButton>
            </MDBox>
          </MDBox>
        )}
      </Paper>
    </DashboardLayout>
  );
}
