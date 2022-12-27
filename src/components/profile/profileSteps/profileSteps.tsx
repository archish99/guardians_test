import { Button, Flex, Text } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React, { useEffect } from "react";
import ProfileStep1 from "./profileStep1";
import ProfileStep2 from "./profileStep2";
import ProfileStep3 from "./profileStep3";
import ProfileStep4 from "./profileStep4";

interface Props {
  setUserProfileCompleted: (value: boolean) => void;
}

const ProfileSteps: React.FC<Props> = ({ setUserProfileCompleted }) => {
  const { activeStep, setStep, nextStep } = useSteps({
    initialStep: 0,
  });

  const steps = [
    {
      label: "Personal Information",
      content: <ProfileStep1 setStep={setStep} />,
    },
    {
      label: "Emergency Contact",
      content: <ProfileStep3 setStep={nextStep} />,
    },
    {
      label: "Medical Information",
      content: <ProfileStep2 setStep={nextStep} />,
    },
    {
      label: "Information Check",
      content: <ProfileStep4 nextStep={nextStep} />,
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("profileConfirmed")) {
      setUserProfileCompleted(true);
    }
  }, []);

  return (
    <Flex
      flexDir="column"
      px="10"
      py="5"
      borderWidth={1}
      borderColor="#D5D5D5"
      rounded="lg"
      boxShadow="md"
      w="70%"
      mx="auto"
    >
      <Steps activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
      {activeStep === 4 ||
        (activeStep === 5 && (
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            mt="8"
          >
            <Text fontWeight="bold" fontSize="18" mb="5">
              Great! View your information now
            </Text>
            <Button
              colorScheme="blue"
              onClick={() => setUserProfileCompleted(true)}
            >
              View Information
            </Button>
          </Flex>
        ))}
    </Flex>
  );
};

export default ProfileSteps;
