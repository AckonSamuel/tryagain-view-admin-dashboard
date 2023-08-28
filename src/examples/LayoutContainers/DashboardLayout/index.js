import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
// react-router-dom components
import { useLocation, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout } from "context";
import { getAdmin } from "redux/slices/admin/getAdminSlice";
import { instrumentFetch } from "redux/slices/instruments/instrumentFetch";
import { categoryFetch } from "redux/slices/categories/fetchCategorySlice";
import { labFetch } from "redux/slices/labs/fetchLabSlice";
import Copyright from "Copyright";

function DashboardLayout({ children }) {
  const categories = useSelector((state) => state.categoryFetch.category);
  const labs = useSelector((state) => state.labFetch.lab);
  const instruments = useSelector((state) => state.instrumentFetch.instrument);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  const dispatched = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setLayout(dispatch, "dashboard");
    dispatched(getAdmin()).then((res) => {
      if (res.type !== "admin/getAdmin/fulfilled") {
        navigate("/authentication/sign-in");
      }
      if (res.type === "admin/getAdmin/fulfilled") {
        if (categories.length === 0) {
          dispatched(categoryFetch());
        }
        if (labs.length === 0) {
          dispatched(labFetch());
        }
        if (instruments.length === 0) {
          dispatched(instrumentFetch());
        }
      }
    });
  }, [pathname]);

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
      <Copyright sx={{ mt: 50 }} />
    </MDBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
