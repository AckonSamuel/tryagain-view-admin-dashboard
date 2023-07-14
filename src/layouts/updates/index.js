/* eslint-disable camelcase */

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
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { labFetch } from "redux/slices/labs/fetchLabSlice";
import { categoryFetch } from "redux/slices/categories/fetchCategorySlice";
import { instrumentUpdate } from "redux/slices/instruments/instrumentUpdate";
import { instrumentFetch } from "redux/slices/instruments/instrumentFetch";

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

export default function UpdateInstrument() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [itemCategory, setItemCategory] = useState([]);
  const [itemLab, setItemLab] = useState([]);

  const { register, getValues, handleSubmit, setValue } = useForm();

  const sampleCategory = useSelector((state) => state.categoryFetch.category);
  const sampleLabs = useSelector((state) => state.labFetch.lab);
  const { loading, error, instrument } = useSelector((state) => state.instrumentUpdate);
  const instruments = useSelector((state) => state.instrumentFetch.instrument);

  const instrumentId = JSON.parse(localStorage.getItem("instrumentId"));
  const targetInstrument =
    instruments.length > 0 ? instruments.find((item) => item.id === instrumentId) : instrument;

  const checkTargetInstrument = () => {
    if (targetInstrument && targetInstrument.attributes) {
      const {
        instrument_name,
        manufacturing_year,
        model,
        price,
        description,
        resolution,
        range,
        accuracy,
        categories,
        labs,
      } = targetInstrument.attributes;

      setValue("instrument_name", instrument_name);
      setValue("manufacturing_year", manufacturing_year);
      setValue("model", model);
      setValue("price", price);
      setValue("description", description);
      setValue("resolution", resolution);
      setValue("range", range);
      setValue("accuracy", accuracy);
      setItemCategory(categories);
      setItemLab(labs);
    }
  };

  useEffect(() => {
    checkTargetInstrument();
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
    if (sampleLabs.length === 0) {
      dispatch(labFetch());
    }
    if (sampleCategory.length === 0) {
      dispatch(categoryFetch());
    }
    if (submitted) {
      setSubmitted(false);
      const data = getValues();
      dispatch(instrumentUpdate([instrumentId, data])).then((res) => {
        if (res.type === "instrument/instrumentUpdate/fulfilled") {
          dispatch(instrumentFetch());
          setOpen(false);
          setSuccess(true);
        }
      });
    }
  }, [dispatch, getValues, sampleCategory.length, sampleLabs.length, submitted]);

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setItemCategory(Array.isArray(value) ? value : [value]);
  };

  const handleLabChange = (event) => {
    const {
      target: { value },
    } = event;
    setItemLab(Array.isArray(value) ? value : [value]);
  };

  return (
    <>
      <MDBox sx={{ marginLeft: 5 }}>
        <MDButton color="success" onClick={handleClickOpen("paper")}>
          Update instrument
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
          <DialogTitle id="scroll-dialog-title">Add Category</DialogTitle>
          <DialogContent dividers={scroll === "paper"} ref={descriptionElementRef}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name of Instrument"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("instrument_name")}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Manufacturing Year"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("manufacturing_year")}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Model"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("model")}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Price"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("price")}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Description"
                variant="standard"
                disabled={loading}
                fullWidth
                multiline
                {...register("description")}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Resolution"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("resolution")}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Range"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("range")}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Accuracy"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("accuracy")}
              />
            </MDBox>
            <MDBox mb={2}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  required
                  value={itemCategory}
                  sx={{ minHeight: 50 }}
                  {...register("categories")}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput id="select-multiple-chip" label="categories" />}
                  renderValue={(selected) => (
                    <MDBox sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={
                            selected.length > 0 &&
                            sampleCategory.find((cat) => cat.id === value)?.attributes.category_name
                          }
                        />
                      ))}
                    </MDBox>
                  )}
                  MenuProps={MenuProps}
                >
                  {sampleCategory.length > 0 &&
                    sampleCategory.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.attributes.category_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </MDBox>
            <MDBox mb={2}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Labs</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  required
                  value={itemLab}
                  {...register("labs")}
                  sx={{ minHeight: 50 }}
                  onChange={handleLabChange}
                  input={<OutlinedInput id="select-multiple-chip" label="labs" />}
                  renderValue={(selected) => (
                    <MDBox sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={
                            selected.length > 0 &&
                            sampleLabs.find((cat) => cat.id === value)?.attributes.lab_name
                          }
                        />
                      ))}
                    </MDBox>
                  )}
                  MenuProps={MenuProps}
                >
                  {sampleLabs.length > 0 &&
                    sampleLabs.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.attributes.lab_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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
    </>
  );
}
