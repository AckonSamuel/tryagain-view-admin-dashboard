import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
import CategoryUpdate from "examples/Registrations/CategoryUpdate";

function RowActions({ categoryId, category }) {
  const [removeExe, setRemoveExe] = useState(false);
  const [soe, setSoe] = useState("");
  const dispatch = useDispatch();

  const removeLoading = useSelector((state) => state.categoryDelete.loading);

  const handleRemoveCategory = () => {
    setRemoveExe(true);
    setSoe(categoryId);
  };

  useEffect(() => {
    if (removeExe) {
      setRemoveExe(false);
      // dispatch(categoryDelete(categoryId)).then((res) => {
      //   if (res.type === "category/categoryDelete/fulfilled") {
      //     dispatch(categoryFetch());
      //     setSoe("");
      //   }
      // });
    }
  });
  return (
    <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
      <CategoryUpdate category={category} />
      {removeLoading && categoryId === soe ? (
        <CircularProgress />
      ) : (
        <Tooltip title="delete" placement="bottom" sx={{ cursor: "pointer" }}>
          <Icon
            fontSize="medium"
            onClick={handleRemoveCategory}
            sx={{ color: "red", marginLeft: 5, cursor: "pointer" }}
          >
            delete
          </Icon>
        </Tooltip>
      )}
    </MDBox>
  );
}
export default RowActions;

RowActions.propTypes = {
  categoryId: PropTypes.string.isRequired,
  category: PropTypes.shape({
    id: PropTypes.string,
    attributes: PropTypes.shape({
      category_name: PropTypes.string,
      email: PropTypes.string,
      portfolio: PropTypes.string,
      contact: PropTypes.number,
      programme: PropTypes.string,
    }),
  }).isRequired,
};
