import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

export default function AddExecutive() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, getValues, handleSubmit } = useForm();

  const loading = useSelector((state) => state.executiveCreate.loading);
  const error = useSelector((state) => state.executiveCreate.error);

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

  // useEffect(() => {
  //   if (submitted) {
  //     setSubmitted(false);
  //     const data = getValues();
  //     dispatch(executiveCreate(data)).then((res) => {
  //       if (res.type === "executive/executiveCreate/fulfilled") {
  //         setOpen(false);
  //         setSuccess(true);
  //         dispatch(executiveFetch());
  //       }
  //     });
  //   }
  // }, [submitted]);

  return (
    <div>
      <MDBox
        sx={{
          marginLeft: 5,
        }}
      >
        <MDButton color="success" onClick={handleClickOpen("paper")}>
          Add executive
        </MDButton>
      </MDBox>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <MDBox component="form" onSubmit={handleSubmit(onSubmit)} fullWidth>
          <DialogTitle id="scroll-dialog-title">Add Executive</DialogTitle>
          <DialogContent dividers={scroll === "paper"} ref={descriptionElementRef}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("executive_name", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="E-mail"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("email", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Portfolio"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("portfolio", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Programme of Study"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("programme", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Contact"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("contact", { required: true })}
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
          {error && <MDTypography color="warning">Add executive unsuccessful</MDTypography>}
          {success && <MDTypography color="warning">Add executive unsuccessful</MDTypography>}
        </MDBox>
      </Dialog>
    </div>
  );
}
