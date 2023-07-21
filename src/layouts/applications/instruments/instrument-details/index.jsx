import React, { useRef, useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PropTypes from "prop-types";
import Stack from "@mui/material/Container";
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateInstrument from "../update-instrument";
import DeleteInstrument from "../delete-instrument";
import Image from "./data/Image";
import Data from "./data";

function InstrumentDetails({ targetId }) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const { instrument } = useSelector((state) => state.instrumentFetch, shallowEqual);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <>
      <Tooltip
        sx={{ cursor: "pointer" }}
        title="view instrument"
        placement="top"
        onClick={handleClickOpen("paper")}
      >
        <VisibilityIcon />
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <MDBox component="div" fullWidth>
          <DialogTitle id="scroll-dialog-title">Instrument Details</DialogTitle>
          <DialogContent dividers={scroll === "paper"} ref={descriptionElementRef}>
            <MDBox py={3}>
              {targetId.length > 0 && <DeleteInstrument targetId={targetId} />}
              {targetId.length > 0 && <UpdateInstrument targetId={targetId} />}
              {instrument
                .filter((item) => item.id === targetId)
                .map((item) => (
                  <Stack direction="row">
                    <Image
                      id={item.id}
                      itemImage={
                        item.attributes.instrument_photos_url.length > 0
                          ? item.attributes.instrument_photos_url[0]
                          : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                      }
                    />
                    <Data instrument={item} />
                  </Stack>
                ))}
            </MDBox>
          </DialogContent>
          <DialogActions>
            <Button color="warning" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </MDBox>
      </Dialog>
    </>
  );
}

InstrumentDetails.defaultProps = {
  targetId: "",
};

InstrumentDetails.propTypes = {
  targetId: PropTypes.string,
};

export default InstrumentDetails;
