import React, { useEffect, useState } from "react";
import { Box, Button, Heading, HStack, useDisclosure } from "@chakra-ui/react";
import ProfileInfo from "../../components/profile/profileInfo/profileInfo";
import ProfileSteps from "../../components/profile/profileSteps/profileSteps";
import EditProfileDrawer from "../../components/profile/editProfileDrawer/editProfileDrawer";

const Profile: React.FC = () => {
  const [userProfileCompleted, setUserProfileCompleted] = useState(false);
  const [initialDrawerValues, setInitialDrawerValues] = useState();

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const localUserProfile = localStorage.getItem("userProfileCompleted");

    if (localUserProfile) {
      setUserProfileCompleted(JSON.parse(localUserProfile));
    }

    setInitialDrawerValues({
      ...JSON.parse(localStorage.getItem("personalInfo") || "{}"),
      ...JSON.parse(localStorage.getItem("medicalInfo") || "{}"),
      ...JSON.parse(localStorage.getItem("emergencyContactInfo") || "{}"),
    });
  }, []);

  return (
    <Box p="10">
      {!userProfileCompleted ? (
        <>
          <Heading fontSize="30" mb="16">
            Please fill out the details
          </Heading>
          <ProfileSteps setUserProfileCompleted={setUserProfileCompleted} />
        </>
      ) : (
        <>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading>Information</Heading>
            <Button colorScheme="blue" onClick={onOpen}>
              Edit
            </Button>
          </HStack>
          <ProfileInfo />
          <EditProfileDrawer
            isOpen={isOpen}
            onClose={onClose}
            initialDrawerValues={initialDrawerValues}
          />
        </>
      )}
    </Box>
  );
};

export default Profile;
