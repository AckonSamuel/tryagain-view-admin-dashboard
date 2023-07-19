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
import { categoryFetch } from "redux/slices/categories/fetchCategorySlice";
import { categoryUpdate } from "redux/slices/categories/updateCategory";

export default function UpdateCategory({ categoryId }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, getValues, handleSubmit, setValue } = useForm();

  const { category, error, loading } = useSelector((state) => state.categoryUpdate, shallowEqual);
  const categories = useSelector((state) => state.categoryFetch.category, shallowEqual);

  const targetCategory =
    categories && categories.length > 0
      ? categories.find((item) => item.id === categoryId)
      : category;

  console.log(targetCategory);
  const checkTargetCategory = () => {
    if (targetCategory && targetCategory.attributes) {
      const { category_name, category_description } = targetCategory.attributes;

      setValue("category_name", category_name);
      setValue("category_description", category_description);
    }
  };

  useEffect(() => {
    checkTargetCategory();
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
      dispatch(categoryUpdate([categoryId, data])).then((res) => {
        if (res.type === "category/categoryUpdate/fulfilled") {
          dispatch(categoryFetch());
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
          <DialogTitle id="scroll-dialog-title">Update Category</DialogTitle>
          <DialogContent dividers={scroll === "paper"} ref={descriptionElementRef}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name of category"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("category_name")}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Description"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("category_description")}
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
          {/* {success && <MDTypography color="warning">Add category unsuccessful</MDTypography>} */}
        </MDBox>
      </Dialog>
    </>
  );
}

UpdateCategory.propTypes = {
  categoryId: PropTypes.string.isRequired,
};
