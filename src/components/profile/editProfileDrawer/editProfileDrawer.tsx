import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialDrawerValues: any;
}

const EditProfileDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  initialDrawerValues,
}) => {
  const formikProps = useFormik({
    initialValues: {
      firstName: initialDrawerValues?.firstName || "",
      lastName: initialDrawerValues?.lastName || "",
      phoneNumber: initialDrawerValues?.phoneNumber || "",
      allergies: initialDrawerValues?.allergies || "",
      currentMedications: initialDrawerValues?.currentMedications || "",
      medicalConditions: initialDrawerValues?.medicalConditions || "",
      emergencyContact: initialDrawerValues?.emergencyContact || "",
    },
    onSubmit: (values) => {
      localStorage.setItem(
        "personalInfo",
        JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
        })
      );
      localStorage.setItem(
        "medicalInfo",
        JSON.stringify({
          allergies: values.allergies,
          currentMedications: values.currentMedications,
          medicalConditions: values.medicalConditions,
        })
      );
      localStorage.setItem(
        "emergencyContact",
        JSON.stringify({
          emergencyContact: values.emergencyContact,
        })
      );
      window.location.reload();
    },
  });

  const { values, handleChange, handleSubmit } = formikProps;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Details</DrawerHeader>
        <DrawerBody>
          <VStack spacing="4">
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                value={values.firstName}
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                value={values.lastName}
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              borderBottomWidth={1}
              borderBottomColor="#D5D5D5"
              pb="5"
            >
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                value={values.phoneNumber}
                placeholder="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Allergies</FormLabel>
              <Input
                type="text"
                value={values.allergies}
                placeholder="Allergies"
                name="allergies"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Current Medication</FormLabel>
              <Input
                type="text"
                value={values.currentMedications}
                placeholder="Current Medication"
                name="currentMedications"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              borderBottomWidth={1}
              borderBottomColor="#D5D5D5"
              pb="5"
            >
              <FormLabel>Medical Conditons</FormLabel>
              <Input
                type="tel"
                value={values.medicalConditions}
                placeholder="Medical Conditons"
                name="medicalConditions"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Emergency Contact</FormLabel>
              <Input
                type="text"
                value={values.emergencyContact}
                placeholder="Emergency Contact"
                name="emergencyContact"
                onChange={handleChange}
              />
            </FormControl>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Button colorScheme="blue" variant="outline" mr="3" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={() => handleSubmit()}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProfileDrawer;
