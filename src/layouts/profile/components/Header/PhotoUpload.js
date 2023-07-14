/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";
import Input from "@mui/material/Input";
import CircularProgress from "@mui/material/CircularProgress";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { postUpload } from "../../../../redux/slices/posts/postUpload";

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function PhotoUpload({ id, size, title, regis }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues } = useForm();
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const loading = useSelector((state) => state.postUpload.loading, shallowEqual);
  const error = useSelector((state) => state.postUpload.error, shallowEqual);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fileUpload = () => {
    setSubmitted(true);
  };

  React.useEffect(() => {
    if (submitted) {
      setSubmitted(false);
      const vad = getValues();
      const data = {
        id,
        instrument_photos: [vad.instrument_photos[0]],
      };

      dispatch(postUpload(data)).then((res) => {
        if (res.type === "post/postUpload/fulfilled") {
          setOpen(false);
          window.location.reload();
        }
      });
    }
  }, [submitted]);

  return (
    <>
      <Tooltip title={title} placement="top" onClick={handleClickOpen}>
        <Icon fontSize={size}>edit</Icon>
      </Tooltip>
      <MDBox component="form" role="form">
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          {loading ? (
            <MDBox p={6}>
              <CircularProgress color="success" />
            </MDBox>
          ) : (
            <>
              <DialogTitle>Choose photo</DialogTitle>
              <DialogContent>
                <DialogContentText
                  display="flex"
                  flexDirection="column"
                  id="alert-dialog-slide-description"
                >
                  {error.length > 0 && (
                    <MDTypography variant="span" color="error">
                      Upload unsuccessful
                    </MDTypography>
                  )}
                  <FormControl>
                    <Input type="file" accept="image/*" name={regis} {...register(regis)} />
                  </FormControl>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="button" onClick={handleSubmit(fileUpload)}>
                  Upload
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </MDBox>
    </>
  );
}

PhotoUpload.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
  regis: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

PhotoUpload.defaultProps = {
  size: "small",
  title: "",
};
