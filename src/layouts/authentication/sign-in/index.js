import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// react-redux component
import { useDispatch } from "react-redux";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// react-hook-forms
import { useForm } from "react-hook-form";

// yup components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDlogo from "components/MDlogo";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Redux functions
import { clubLogin } from "redux/slices/clubs/loginSlice";

// export let currentStudent = "";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const bgImage =
    "https://user-images.githubusercontent.com/92922987/209251235-962d91f6-12eb-4341-9e71-eaf504965806.jpg";

  // let password;
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // watch,
    getValues,
  } = useForm();

  const showdata = () => {
    const data = getValues();

    dispatch(clubLogin(data)).then((res) => {
      if (res.type === "club/clubLogin/fulfilled") {
        navigate("/club/edit");
      }
      // if (res.type === "student/studentLogout/rejected") {
      // }
    });
  };

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
          <MDTypography variant="h4" fontWeight="medium" color="dark" mt={0.4}>
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
          <MDBox component="form" role="form" onSubmit={handleSubmit(showdata)}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                {...register("email", {
                  required: true,
                  // pattern: /@st.knust.edu.gh/i
                })}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  autoComplete="current-password"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  {...register("password", { required: true })}
                />
              </FormControl>
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
              <MDButton variant="gradient" color="success" type="submit" fullWidth>
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
