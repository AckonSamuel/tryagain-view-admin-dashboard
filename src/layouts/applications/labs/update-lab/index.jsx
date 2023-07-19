/* eslint-disable camelcase */

import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { labFetch } from "redux/slices/labs/fetchLabSlice";
import { labUpdate } from "redux/slices/labs/updateLabSlice";

export default function UpdateLab({ labId }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, getValues, handleSubmit, setValue } = useForm();

  const { lab, error, loading } = useSelector((state) => state.labUpdate, shallowEqual);
  const labs = useSelector((state) => state.labFetch.lab, shallowEqual);

  const targetlab = labs && labs.length > 0 ? labs.find((item) => item.id === labId) : lab;

  const checkTargetlab = () => {
    if (targetlab && targetlab.attributes) {
      const { lab_name, lab_location } = targetlab.attributes;

      setValue("lab_name", lab_name);
      setValue("lab_location", lab_location);
    }
  };

  useEffect(() => {
    checkTargetlab();
  }, []);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    setSubmitted(true);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
      const data = getValues();
      dispatch(labUpdate([labId, data])).then((res) => {
        if (res.type === "lab/labUpdate/fulfilled") {
          dispatch(labFetch());
          setOpen(false);
          setSuccess(true);
        }
      });
    }
  }, [dispatch, getValues, submitted]);

  return (
    <>
      <Tooltip
        sx={{ cursor: "pointer" }}
        title="edit"
        placement="top"
        onClick={handleClickOpen("paper")}
      >
        <Icon fontSize="small">edit</Icon>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <MDBox component="form" onSubmit={handleSubmit(onSubmit)} fullWidth>
          <DialogTitle id="scroll-dialog-title">Update lab</DialogTitle>
          <DialogContent dividers={scroll === "paper"} ref={descriptionElementRef}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name of lab"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("lab_name")}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Location"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("lab_location")}
              />
            </MDBox>
          </DialogContent>
          <DialogActions>
            <Button color="warning" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="success" type="submit">
              Save
            </Button>
          </DialogActions>
          {error && <MDTypography color="warning">Add lab unsuccessful</MDTypography>}
          {/* {success && <MDTypography color="warning">Add lab unsuccessful</MDTypography>} */}
        </MDBox>
      </Dialog>
    </>
  );
}

UpdateLab.propTypes = {
  labId: PropTypes.string.isRequired,
};
