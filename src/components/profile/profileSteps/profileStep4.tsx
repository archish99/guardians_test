import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props {
  nextStep: () => void;
}

const ProfileStep4: React.FC<Props> = ({ nextStep }) => {
  const [personalInfo, setPersonalInfo] = useState<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }>();
  const [medicalInfo, setMedicalInfo] = useState<{
    allergies: string;
    currentMedications: string;
    medicalConditions: string;
  }>();
  const [emergencyContact, setEmergencyContact] = useState<{
    emergencyContact: string;
  }>();

  useEffect(() => {
    if (localStorage.getItem("profileConfirmed")) {
      nextStep();
    }

    setPersonalInfo(JSON.parse(localStorage.getItem("personalInfo") || "{}"));
    setMedicalInfo(JSON.parse(localStorage.getItem("medicalInfo") || "{}"));
    setEmergencyContact(
      JSON.parse(localStorage.getItem("emergencyContactInfo") || "{}")
    );
  }, []);

  return (
    <VStack mt="5" spacing="7">
      <Text textAlign="left" fontSize="18" w="80%">
        Please check your information
      </Text>
      <Box w="70%" borderWidth={1} borderColor="#D5D5D5" rounded="md" p="5">
        <Text fontWeight="bold" fontSize="17">
          Personal Information
        </Text>
        <Box p="4">
          <HStack alignItems="center" justifyContent="space-around">
            <Box>
              <Text fontWeight="bold">First Name</Text>
              <Text>{personalInfo?.firstName || "-"}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Last Name</Text>
              <Text>{personalInfo?.lastName || "-"}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Phone Number</Text>
              <Text>{personalInfo?.phoneNumber || "-"}</Text>
            </Box>
          </HStack>
        </Box>
      </Box>
      <Box w="70%" borderWidth={1} borderColor="#D5D5D5" rounded="md" p="5">
        <Text fontWeight="bold" fontSize="17">
          Medical Information
        </Text>
        <Box p="4">
          <HStack alignItems="center" justifyContent="space-around">
            <Box>
              <Text fontWeight="bold">Allergies</Text>
              <Text>{medicalInfo?.allergies || "-"}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Current Medications</Text>
              <Text>{medicalInfo?.currentMedications || "-"}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Medical Conditions</Text>
              <Text>{medicalInfo?.medicalConditions || "-"}</Text>
            </Box>
          </HStack>
        </Box>
      </Box>
      <Box w="70%" borderWidth={1} borderColor="#D5D5D5" rounded="md" p="5">
        <Text fontWeight="bold" fontSize="17">
          Emergency Contact
        </Text>
        <Box p="4">
          <HStack alignItems="center" ml="10">
            <Box>
              <Text fontWeight="bold">Emergency Contact</Text>
              <Text>{emergencyContact?.emergencyContact || "-"}</Text>
            </Box>
          </HStack>
        </Box>
      </Box>
      <Button
        colorScheme="blue"
        alignSelf="end"
        onClick={() => {
          localStorage.setItem("profileConfirmed", "true");
          nextStep();
        }}
      >
        Confirm
      </Button>
    </VStack>
  );
};

export default ProfileStep4;
