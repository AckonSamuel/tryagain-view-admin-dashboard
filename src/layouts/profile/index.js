// @mui material components
import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Skeleton from "@mui/material/Skeleton";

// @mui icons

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import { myClubFetch } from "redux/slices/clubs/getMyClub";

function Overview() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(myClubFetch());
  }, [dispatch]);

  const myClub = useSelector((state) => state.myClubFetch, shallowEqual);

  const { club } = myClub;

  const clubName = club.attributes ? club.attributes.club_name : <Skeleton width={100} />;
  const description = club.attributes ? club.attributes.description : <Skeleton width={1000} />;
  const meetingLocation = club.attributes ? (
    club.attributes.meeting_location
  ) : (
    <Skeleton width={100} />
  );
  const email = club.attributes ? club.attributes.email : <Skeleton width={100} />;
  const history = club.attributes ? club.attributes.history : <Skeleton width={100} />;
  const meetingTime = club.attributes ? club.attributes.meeting_time : <Skeleton width={100} />;
  const telephoneNumber = club.attributes ? (
    club.attributes.telephone_number
  ) : (
    <Skeleton width={100} />
  );
  const group = club.attributes ? club.attributes.group : <Skeleton width={100} />;
  const bannerPhotoUrl = club.attributes ? club.attributes.banner_photo_url : "";
  const profilePhotoUrl = club.attributes ? club.attributes.profile_photo_url : "";

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header
        clubName={clubName}
        bannerPhotoUrl={bannerPhotoUrl}
        profilePhotoUrl={profilePhotoUrl}
        group={group}
      >
        <MDBox mt={5} mb={3}>
          <ProfileInfoCard
            title="profile information"
            description={description}
            info={{
              fullName: clubName,
              mobile: telephoneNumber,
              email,
              location: meetingLocation,
              history,
              time: meetingTime,
              group,
            }}
            action={{ route: "/profile/edit", tooltip: "Edit Profile" }}
            shadow={false}
          />
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
