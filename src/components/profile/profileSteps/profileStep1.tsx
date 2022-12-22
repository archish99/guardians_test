import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  setStep: (step: number) => void;
}

const ProfileStep1: React.FC<Props> = ({ setStep }) => {
  const formikProps = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please enter your first name"),
      lastName: Yup.string().required("Please enter your last name"),
      phoneNumber: Yup.string()
        .length(10, "Please enter a valid phone number")
        .required("Please enter your phone number"),
    }),
    onSubmit: (values) => {
      localStorage.setItem("personalInfo", JSON.stringify(values));
      setStep(1);
    },
  });

  const { values, touched, errors, handleChange, handleSubmit } = formikProps;

  useEffect(() => {
    if (localStorage.getItem("personalInfo")) {
      setStep(1);
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <VStack w="70%" mx="auto" mt="5" spacing="10">
        <FormControl isInvalid={!!errors.firstName && !!touched.firstName}>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            value={values.firstName}
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.firstName}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.lastName && !!touched.lastName}>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            value={values.lastName}
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.lastName}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phoneNumber && !!touched.phoneNumber}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            value={values.phoneNumber}
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
        </FormControl>
        <Button alignSelf="end" w="20%" colorScheme="blue" type="submit">
          Next
        </Button>
      </VStack>
    </form>
  );
};

export default ProfileStep1;
