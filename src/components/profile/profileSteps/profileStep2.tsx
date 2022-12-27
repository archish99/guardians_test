import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  setStep: () => void;
}

const ProfileStep2: React.FC<Props> = ({ setStep }) => {
  const formikProps = useFormik({
    initialValues: {
      allergies: "",
      currentMedications: "",
      medicalConditions: "",
    },
    validationSchema: Yup.object({
      allergies: Yup.string(),
      currentMedications: Yup.string(),
      medicalConditions: Yup.string(),
    }),
    onSubmit: (values) => {
      localStorage.setItem("medicalInfo", JSON.stringify(values));
      setStep();
    },
  });

  const { values, touched, errors, handleChange, handleSubmit } = formikProps;

  useEffect(() => {
    if (localStorage.getItem("medicalInfo")) {
      setStep();
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
        <FormControl isInvalid={!!errors.allergies && !!touched.allergies}>
          <FormLabel>Allergies (if any)</FormLabel>
          <Input
            type="text"
            value={values.allergies}
            placeholder="Allergies"
            name="allergies"
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.allergies}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            !!errors.currentMedications && !!touched.currentMedications
          }
        >
          <FormLabel>Current Medication (if any)</FormLabel>
          <Input
            type="text"
            value={values.currentMedications}
            placeholder="Current Medication"
            name="currentMedications"
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.currentMedications}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors.medicalConditions && !!touched.medicalConditions}
        >
          <FormLabel>Medical Conditons (if any)</FormLabel>
          <Input
            type="tel"
            value={values.medicalConditions}
            placeholder="Medical Conditons"
            name="medicalConditions"
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.medicalConditions}</FormErrorMessage>
        </FormControl>
        <HStack>
          <Button alignSelf="end" w="20%" colorScheme="blue" type="submit">
            Next
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default ProfileStep2;
