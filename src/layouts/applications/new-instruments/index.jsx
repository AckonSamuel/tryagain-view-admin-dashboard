import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { executiveCreate } from "redux/slices/clubs/executiveCreate";
import { executiveFetch } from "redux/slices/clubs/executivesFetch";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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

export default function AddExecutive() {
  const dispatch = useDispatch();
  const [itemName, setitemName] = useState([]);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, getValues, handleSubmit } = useForm();

  const sampleCategory = ['power', 'measurement', 'protection', 'soldering'];
  const sampleLabs = ['mechanical', 'electrical', 'computer', 'electronics'];

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

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
      const data = getValues();
      dispatch(executiveCreate(data)).then((res) => {
        if (res.type === "executive/executiveCreate/fulfilled") {
          setOpen(false);
          setSuccess(true);
          dispatch(executiveFetch());
        }
      });
    }
  }, [submitted]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setitemName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <MDBox
        sx={{
          marginLeft: 5,
        }}
      >
        <MDButton color="success" onClick={handleClickOpen("paper")}>
          Add equipment
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
                label="Name of Equipment"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("equipment_name", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="E-mail"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("manufacturing_year", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Portfolio"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("equipment_model", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Programme of Study"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("price", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Contact"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("description", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Contact"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("resolution", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Contact"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("range", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Contact"
                variant="standard"
                disabled={loading}
                fullWidth
                {...register("accuracy", { required: true })}
              />
            </MDBox>
            <MDBox mb={2}>
            <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={itemName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="categories" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {sampleCategory.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
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
          {error && <MDTypography color="warning">Add executive unsuccessful</MDTypography>}
          {success && <MDTypography color="warning">Add executive unsuccessful</MDTypography>}
        </MDBox>
      </Dialog>
    </div>
  );
}
