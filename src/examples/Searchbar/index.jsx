import { useSelector, shallowEqual, useDispatch } from "react-redux";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import { searchTitle, search } from "redux/slices/instruments/instrumentFetch";

function Searchbar() {
  const dispatch = useDispatch();

  const textListener = (instrument_name) => {
    dispatch(searchTitle(instrument_name));
    dispatch(search(instrument_name));
  };

  const searchText = useSelector((state) => state.instrumentFetch.search, shallowEqual);

  return (
    <MDBox pr={1}>
      <MDInput
        label="Search instruments..."
        value={searchText}
        inputProps={{
          "aria-label": "Search Instruments",
          onChange: (e) => textListener(e.target.value),
        }}
      />
    </MDBox>
  );
}

export default Searchbar;
