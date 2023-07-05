// @mui material components
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

// react-form-hook components
import { useForm } from "react-hook-form";

// yup components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
// import { postUpload } from "redux/slices/posts/postUpload";
// import { myClubFetch } from "redux/slices/clubs/getMyClub";
import MDButton from "components/MDButton";
// import PDFPreview from "components/MDThumbnail.js";

function RequiredDocuments() {
  const dispatch = useDispatch();
  const { register, getValues } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const loading = useSelector((state) => state.postUpload.loading);
  const club = useSelector((state) => state.myClubFetch.club);

  useEffect(() => {
    // dispatch(myClubFetch());
  }, [dispatch, submitted]);

  // const myClub = useSelector((state) => state.myClubFetch, shallowEqual);

  // const { club } = myClub;

  const registration = club.attributes ? club.attributes.registration_application_letter_url : "";
  const photoo1 = club.attributes ? club.attributes.passport_photos_url[0] : "";
  const photoo2 = club.attributes ? club.attributes.passport_photos_url[1] : "";
  const constitution = club.attributes ? club.attributes.constitution_url : "";
  const endorsement = club.attributes ? club.attributes.endorsement_letter_url : "";

  const fileUpload = () => {
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
      const vad = getValues();
      console.log(vad);
      const data = {};
      [
        "registration_application_letter",
        "passport_photos",
        "constitution",
        "endorsement_letter",
      ].forEach((document) => {
        if (vad[document].length > 0) {
          if (document === "passport_photos") {
            data[document] = {};
            const { 0: photo1, 1: photo2 } = vad[document];
            data[document] = { photo1, photo2 };
          } else {
            const [dataValue] = vad[document];
            data[document] = dataValue;
          }
        }
      });
      console.log(data);
      // dispatch(postUpload(data)).then((res) => {
      //   if (res.type === "post/postUpload/fulfilled") {
      //     console.log(club);
      //     // window.location.reload();
      //     setSuccess(true);
      //     setFailure(false);
      //     console.log(club);
      //   }
      //   if (res.type === "post/postUpload/rejected") {
      //     setFailure(true);
      //     setSuccess(false);
      //   }
      // });
    }
  }, [submitted]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
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
                  Upload Required Documents
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={3} pt={3} pb={3} component="form" role="form">
                <MDBox sx={{ marginBottom: "1em" }}>
                  <Paper elevation={6} sx={{ padding: "1em" }}>
                    <MDTypography variant="h6">Application letter for registration</MDTypography>
                    <Input
                      type="file"
                      disabled={loading}
                      {...register("registration_application_letter")}
                    />
                    {registration && (
                      <Link
                        href={registration}
                        sx={{ color: "green", marginRight: "1em", fontSize: "0.8em" }}
                        underline="hover"
                      >
                        registration application letter
                      </Link>
                    )}
                  </Paper>
                </MDBox>
                <MDBox sx={{ marginBottom: "1em" }}>
                  <Paper elevation={6} sx={{ padding: "1em" }}>
                    <MDTypography variant="h6">
                      Passport size picture of two executives
                    </MDTypography>
                    <Input
                      type="file"
                      disabled={loading}
                      inputProps={{ multiple: true }}
                      {...register("passport_photos")}
                    />
                    {photoo1 && (
                      <Link
                        href={photoo1}
                        sx={{ color: "green", marginRight: "1em", fontSize: "0.8em" }}
                        color="success"
                        underline="hover"
                      >
                        photo 1
                      </Link>
                    )}
                    {photoo2 && (
                      <Link
                        href={photoo2}
                        sx={{ color: "green", marginRight: "1em", fontSize: "0.8em" }}
                        underline="hover"
                      >
                        photo 2
                      </Link>
                    )}
                  </Paper>
                </MDBox>
                <MDBox sx={{ marginBottom: "1em" }}>
                  <Paper elevation={6} sx={{ padding: "1em" }}>
                    <MDTypography variant="h6">
                      Constitution of Society. (Signed by the president and dated)
                    </MDTypography>
                    <Input type="file" {...register("constitution")} disabled={loading} />
                    {constitution && (
                      <Link
                        href={constitution}
                        sx={{ color: "green", marginRight: "1em", fontSize: "0.8em" }}
                        underline="hover"
                      >
                        constitution
                      </Link>
                    )}
                  </Paper>
                </MDBox>
                <MDBox>
                  <Paper elevation={6} sx={{ padding: "1em" }}>
                    <MDTypography variant="h6">
                      Endorsement letter from patron. (Senior member of the university)
                    </MDTypography>
                    <Input type="file" {...register("endorsement_letter")} disabled={loading} />
                    {endorsement && (
                      <Link
                        href={endorsement}
                        sx={{ color: "green", marginRight: "1em", fontSize: "0.8em" }}
                        underline="hover"
                      >
                        endorsement letter
                      </Link>
                    )}
                  </Paper>
                </MDBox>

                <MDButton
                  disabled={loading}
                  color="success"
                  onClick={fileUpload}
                  sx={{
                    marginTop: "1.5em",
                  }}
                >
                  {loading ? "Updating progress..." : "Save progress"}
                </MDButton>
                {success && (
                  <MDTypography variant="h6" color="success" sx={{ marginTop: "1.5em" }}>
                    Progress saved!
                  </MDTypography>
                )}
                {failure && (
                  <MDTypography variant="h6" color="danger" sx={{ marginTop: "1.5em" }}>
                    Progress not saved. Please try again.
                  </MDTypography>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default RequiredDocuments;
