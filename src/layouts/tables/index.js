// @mui material components
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import AddCategory from "examples/Registrations/CategoryModal";

// Data
import RowActions from "./data/RowActions";

function Tables() {
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.categoryFetch.category);

  useEffect(() => {
    // dispatch(categoryFetch());
  }, [dispatch]);

  console.log(categorys);
  const columns = [
    { Header: "Portfolio", accessor: "Portfolio", align: "left" },
    { Header: "Name", accessor: "Name", align: "left" },
    { Header: "Contact", accessor: "Contact", align: "center" },
    { Header: "Programme", accessor: "Programme", align: "center" },
    { Header: "Email", accessor: "Email", align: "center" },
    { Header: "Actions", accessor: "Actions", align: "center" },
  ];

  const rows = [];
  const rowlet = [];
  if (categorys && categorys.length > 0) {
    categorys.forEach((category) => {
      rows.push({
        Name: category.attributes.category_name,
        Portfolio: category.attributes.portfolio,
        Contact: category.attributes.contact,
        Programme: category.attributes.programme,
        Email: category.attributes.email,
        Actions: <RowActions categoryId={category.id} category={category} />,
      });
    });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
              >
                <MDTypography variant="h6" color="white">
                  Categorys data table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <AddCategory />
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  rowlet={rowlet}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
