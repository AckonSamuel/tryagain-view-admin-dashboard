import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import DeleteInstrument from "../../delete-instrument";
import UpdateInstrument from "../../update-instrument";
import InstrumentDetails from "../../instrument-details";

export default function InstrumentActions({ id }) {
  return (
    <Stack>
      <DeleteInstrument targetId={id} />
      <UpdateInstrument targetId={id} />
      <InstrumentDetails targetId={id} />
    </Stack>
  );
}

InstrumentActions.propTypes = {
  id: PropTypes.string.isRequired,
};
