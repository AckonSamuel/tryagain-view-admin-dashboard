import { useSelector, shallowEqual } from "react-redux";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Tables from "examples/Tables/DataTable";
import Data from "./data";
import Addcategory from "./add-new-category";

function Categories() {
  const { category } = useSelector((state) => state.categoryFetch, shallowEqual);
  const { columns, rows } = Data();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Tables
          AddNew={Addcategory}
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
    </DashboardLayout>
  );
}

export default Categories;
