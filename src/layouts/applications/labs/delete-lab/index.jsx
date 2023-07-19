/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import MDBox from "components/MDBox";
import { labDelete } from "redux/slices/labs/deleteLabs";
import MDTypography from "components/MDTypography";
import { CircularProgress } from "@mui/material";
import { labFetch } from "redux/slices/labs/fetchLabSlice";

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function DeleteLab({ labId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { loading, error } = useSelector((state) => state.labDelete, shallowEqual);
  const { lab } = useSelector((state) => state.labFetch, shallowEqual);
  const targetlab = lab.find((item) => item.id === labId);

  useEffect(() => {
    if (submitted) {
      setIsMounted(true);
      setSubmitted(false);
      const targetId = targetlab.id;
      dispatch(labDelete(targetId)).then((res) => {
        if (isMounted) {
          // Check if the component is still mounted before updating state
          if (res.type === "lab/labDelete/fulfilled") {
            dispatch(labFetch()).then((result) => {
              if (isMounted) {
                // Check again before updating state
                if (result.type === "lab/labFetch/fulfilled") {
                  setOpen(false);
                  navigate("/labs");
                }
              }
            });
          }
        }
      });
    }

    return () => {
      setIsMounted(false); // Clean up the flag when the component is unmounted
    };
  }, [submitted, dispatch, navigate, targetlab]);

  const handleDelete = () => {
    setSubmitted(true);
  };

  return (
    <>
      <Tooltip sx={{ cursor: "pointer" }} title="delete" placement="top" onClick={handleClickOpen}>
        <Icon fontSize="small">delete</Icon>
      </Tooltip>
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
                Deleting lab...
              </MDTypography>
            </MDBox>
          ) : (
            <>
              <DialogTitle>Are you sure you want to delete this lab?</DialogTitle>
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

DeleteLab.propTypes = {
  labId: PropTypes.string.isRequired,
};
