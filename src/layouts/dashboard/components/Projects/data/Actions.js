import React from "react";
import MDBox from "components/MDBox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Actions() {
  return (
    <MDBox sx={{ width: "100%" }}>
      <FormControl fullWidth variant="standard">
        <InputLabel fullWidth htmlFor="actions">
          Choose...
        </InputLabel>
        <Select id="applist" label="actions" variant="standard" fullWidth>
          <MenuItem value="Approve">Approve</MenuItem>
          <MenuItem value="View">View</MenuItem>
          <MenuItem value="Reject">Reject</MenuItem>
        </Select>
      </FormControl>
    </MDBox>
  );
}

export default Actions;
