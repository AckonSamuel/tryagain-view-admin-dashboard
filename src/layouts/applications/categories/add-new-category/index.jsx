/* eslint-disable no-unused-vars */

import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { categoryCreate } from "redux/slices/categories/addCategorySlice";
import { categoryFetch } from "redux/slices/categories/fetchCategorySlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

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

export default function Addcategory() {
  const dispatch = useDispatch();
  const [itemCategory, setitemCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, getValues, handleSubmit } = useForm();

  const sampleCategory = ["power", "measurement", "protection", "soldering"];
  const sampleLabs = ["mechanical", "electrical", "computer", "electronics"];

  const loading = useSelector((state) => state.categoryCreate.loading);
  const error = useSelector((state) => state.categoryCreate.error);

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
      dispatch(categoryCreate(data)).then((res) => {
        if (res.type === "category/categoryCreate/fulfilled") {
          setOpen(false);
          setSuccess(true);
          dispatch(categoryFetch());
        }
      });
    }
  }, [submitted]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setitemCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <Tooltip
        sx={{ cursor: "pointer" }}
        title="add new lab"
        placement="top"
        onClick={handleClickOpen("paper")}
      >
        <ControlPointIcon />
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
          <DialogTitle id="scroll-dialog-title">Add category</DialogTitle>
          <DialogContent dividers={scroll === "paper"} ref={descriptionElementRef}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("category_name", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                multiline
                minRow={2}
                label="Description"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("category_description", { required: true })}
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
