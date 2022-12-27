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

const ProfileStep3: React.FC<Props> = ({ setStep }) => {
  const formikProps = useFormik({
    initialValues: {
      emergencyContact: "",
    },
    validationSchema: Yup.object({
      emergencyContact: Yup.string()
        .length(10, "Please enter a valid contact number")
        .required("Please enter your emergency contact"),
    }),
    onSubmit: (values) => {
      localStorage.setItem("emergencyContactInfo", JSON.stringify(values));
      setStep();
    },
  });

  const { values, touched, errors, handleChange, handleSubmit } = formikProps;

  useEffect(() => {
    if (localStorage.getItem("emergencyContactInfo")) {
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
        <FormControl
          isInvalid={!!errors.emergencyContact && !!touched.emergencyContact}
        >
          <FormLabel>Emergency Contact</FormLabel>
          <Input
            type="text"
            value={values.emergencyContact}
            placeholder="Emergency Contact"
            name="emergencyContact"
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.emergencyContact}</FormErrorMessage>
        </FormControl>
        <Button alignSelf="end" w="20%" colorScheme="blue" type="submit">
          Next
        </Button>
      </VStack>
    </form>
  );
};

export default ProfileStep3;
