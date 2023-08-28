/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import MDBox from "components/MDBox";
import { adminLogout } from "redux/slices/admin/logoutSlice";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { CircularProgress } from "@mui/material";

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loading = useSelector((state) => state.adminLogout.loading, shallowEqual);
  // const error = useSelector((state) => state.adminLogout.error, shallowEqual);

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
      dispatch(adminLogout()).then((res) => {
        if (res.type === "admin/adminLogout/fulfilled") {
          setOpen(false);
          navigate("/authentication/sign-in");
        }
      });
    }
  }, [submitted]);

  const handleLogout = () => {
    setSubmitted(true);
  };

  return (
    <>
      <MDButton bgcolor="warning" onClick={handleClickOpen}>
        Logout
      </MDButton>
      <MDBox component="form" role="form">
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          {" "}
          {loading ? (
            <MDBox p={7} display="flex" justifyItems="space-between" gap="1em">
              <CircularProgress color="success" />
              <MDTypography component="h6" color="success">
                Signing out...
              </MDTypography>
            </MDBox>
          ) : (
            <>
              <DialogTitle>Are you sure you want to logout?</DialogTitle>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  sx={{
                    color: "success",
                    backgroundColor: "white",
                    borderColor: "error.main",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  sx={{
                    color: "error.main",
                    backgroundColor: "white",
                    fontWeight: "bold",
                  }}
                  onClick={handleLogout}
                >
                  Yes
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </MDBox>
    </>
  );
}
