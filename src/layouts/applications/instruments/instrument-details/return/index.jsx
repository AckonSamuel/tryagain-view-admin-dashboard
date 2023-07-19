import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Return() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/instruments");
  };

  return (
    <MDBox>
      <MDButton onClick={() => goHome()}>
        <ArrowBackIcon />
        Back
      </MDButton>
    </MDBox>
  );
}

export default Return;
