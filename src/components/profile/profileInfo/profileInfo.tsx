import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const ProfileInfo: React.FC = () => {
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
    setPersonalInfo(JSON.parse(localStorage.getItem("personalInfo") || "{}"));
    setMedicalInfo(JSON.parse(localStorage.getItem("medicalInfo") || "{}"));
    setEmergencyContact(
      JSON.parse(localStorage.getItem("emergencyContactInfo") || "{}")
    );
  }, []);

  return (
    <HStack p="10" borderWidth={1} borderColor="#D5D5D5" rounded="lg" mt="8">
      <Box w="33%" borderRightWidth={1} borderRightColor="#D5D5D5" p="3">
        <Text fontWeight="bold" fontSize="20">
          Personal Information
        </Text>
        <HStack px="4" py="2" justifyContent="space-between">
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
      <Box w="40%" borderRightWidth={1} borderRightColor="#D5D5D5" p="3">
        <Text fontWeight="bold" fontSize="20">
          Medical Information
        </Text>
        <HStack px="4" py="2" justifyContent="space-between">
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
      <Box w="27%" p="3">
        <Text fontWeight="bold" fontSize="20">
          Emergency Contact
        </Text>
        <HStack px="4" py="2">
          <Box>
            <Text fontWeight="bold">Emergency Contact</Text>
            <Text>{emergencyContact?.emergencyContact || "-"}</Text>
          </Box>
        </HStack>
      </Box>
    </HStack>
  );
};

export default ProfileInfo;
