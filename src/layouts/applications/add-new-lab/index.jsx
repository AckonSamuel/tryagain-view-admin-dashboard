import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { labCreate } from "redux/slices/labs/addLabSlice";
import { labFetch } from "redux/slices/labs/fetchLabSlice";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function AddLab() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, getValues, handleSubmit } = useForm();

  const loading = useSelector((state) => state.labCreate.loading);
  const error = useSelector((state) => state.labCreate.error);

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
      dispatch(labCreate(data)).then((res) => {
        if (res.type === "category/categoryCreate/fulfilled") {
          setOpen(false);
          setSuccess(true);
          dispatch(labFetch());
        }
      });
    }
  }, [submitted]);

  return (
    <div>
      <MDBox
        sx={{
          marginLeft: 5,
        }}
      >
        <MDButton color="success" onClick={handleClickOpen("paper")}>
          Add new lab
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
          <DialogTitle id="scroll-dialog-title">Add lab</DialogTitle>
          <DialogContent dividers={scroll === "paper"} ref={descriptionElementRef}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("lab_name", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Location"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("lab_location", { required: true })}
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
          {error && <MDTypography color="warning">Add category unsuccessful</MDTypography>}
          {success && <MDTypography color="warning">Add category unsuccessful</MDTypography>}
        </MDBox>
      </Dialog>
    </div>
  );
}
