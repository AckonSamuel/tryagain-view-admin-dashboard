import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Tables from "examples/Tables/DataTable";
import Data from "./data";
import AddLab from "./add-new-lab";

function Labs() {
  const { columns, rows } = Data();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Tables
          AddNew={AddLab}
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

export default Labs;
