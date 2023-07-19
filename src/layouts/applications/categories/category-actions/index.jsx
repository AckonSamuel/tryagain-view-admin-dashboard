import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import DeleteCategory from "../delete-category";
import UpdateCategory from "../update-category";

export default function CategoryActions({ id }) {
  return (
    <Stack>
      <DeleteCategory categoryId={id} />
      <UpdateCategory categoryId={id} />
    </Stack>
  );
}

CategoryActions.propTypes = {
  id: PropTypes.string.isRequired,
};
