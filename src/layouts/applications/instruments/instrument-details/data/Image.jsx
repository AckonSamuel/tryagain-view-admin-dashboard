import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import PhotoUpload from "layouts/profile/components/Header/PhotoUpload";

function Image({ id, itemImage }) {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      position="relative"
      minHeight="18.75rem"
      borderRadius="xl"
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.0),
            rgba(gradients.info.state, 0.0)
          )}, url(${itemImage})`,
        "&:hover": {
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${itemImage})`,
        },
        "&:hover .edit-image": { display: "block", cursor: "pointer" },
        backgroundSize: "cover",
        backgroundPosition: "50%",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <MDBox
        className="edit-image"
        sx={{
          display: "none",
          margin: "auto",
        }}
      >
        <PhotoUpload
          id={id}
          size="medium"
          title="Change instrument photo"
          regis="instrument_photos"
        />
      </MDBox>
    </MDBox>
  );
}

Image.defaultProps = {
  itemImage: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
};

Image.propTypes = {
  itemImage: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default Image;
