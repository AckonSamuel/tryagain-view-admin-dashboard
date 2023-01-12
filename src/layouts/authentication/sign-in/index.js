import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// react-redux component
// import { useDispatch } from "react-redux";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// react-hook-forms
// import { useForm } from "react-hook-form";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDlogo from "components/MDlogo";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import PasswordInput from "components/MDInput/PasswordInput";


function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const bgImage = "https://user-images.githubusercontent.com/92922987/209251235-962d91f6-12eb-4341-9e71-eaf504965806.jpg";

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          // bgColor="success"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-5}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDlogo />
          <MDTypography variant="h4" fontWeight="medium" color="black" mt={0.4}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox 
        // pt={4} pb={3} px={3}
        variant="gradient"
        // bgColor="success"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={-3}
        p={2}
        mb={1}
        textAlign="center"
        >
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <PasswordInput type="password" label="Password" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="success" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="success"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
