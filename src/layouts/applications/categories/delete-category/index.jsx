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
import { categoryDelete } from "redux/slices/categories/deleteCategories";
import MDTypography from "components/MDTypography";
import { CircularProgress } from "@mui/material";
import { categoryFetch } from "redux/slices/categories/fetchCategorySlice";

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function DeleteCategory({ categoryId }) {
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

  const { loading, error } = useSelector((state) => state.categoryDelete, shallowEqual);
  const { category } = useSelector((state) => state.categoryFetch, shallowEqual);
  const targetCategory = category.find((item) => item.id === categoryId);

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
      const targetId = targetCategory.id;
      dispatch(categoryDelete(targetId)).then((res) => {
        if (res.type === "category/categoryDelete/fulfilled") {
          dispatch(categoryFetch()).then((result) => {
            if (result.type === "category/categorytFetch/fulfilled") {
              setOpen(false);
              navigate("/categories");
            }
          });
        }
      });
    }
  }, [submitted]);

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
                Deleting category...
              </MDTypography>
            </MDBox>
          ) : (
            <>
              <DialogTitle>Are you sure you want to delete this category?</DialogTitle>
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

DeleteCategory.propTypes = {
  categoryId: PropTypes.string.isRequired,
};
