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
import { instrumentDelete } from "redux/slices/instruments/instrumentDelete";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { CircularProgress } from "@mui/material";
import { instrumentFetch } from "redux/slices/instruments/instrumentFetch";

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function DeleteInstrument() {
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

  const { loading, error }= useSelector((state) => state.instrumentDelete, shallowEqual);
  const { id } = useSelector((state) => state.instrumentFetch, shallowEqual);

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
      dispatch(instrumentDelete(id)).then((res) => {
        if (res.type === "instrument/instrumentDelete/fulfilled") {
          setOpen(false);
          dispatch(instrumentFetch());
          navigate("/instruments");
        }
      });
    }
  }, [submitted]);

  const handleDelete = () => {
    setSubmitted(true);
  };

  return (
    <>
      <MDButton bgcolor="warning" onClick={handleClickOpen}>
        Delete
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
                Deleting instrument...
              </MDTypography>
            </MDBox>
          ) : (
            <>
              <DialogTitle>Are you sure you want to delete this instrument?</DialogTitle>
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
                  onClick={handleDelete}
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
