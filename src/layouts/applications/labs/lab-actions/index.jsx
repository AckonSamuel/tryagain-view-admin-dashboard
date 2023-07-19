import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import DeleteLab from "../delete-lab";
import UpdateLab from "../update-lab";

export default function LabActions({ id }) {
  return (
    <Stack>
      <DeleteLab labId={id} />
      <UpdateLab labId={id} />
    </Stack>
  );
}

LabActions.propTypes = {
  id: PropTypes.string.isRequired,
};
