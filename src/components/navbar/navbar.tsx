import React from "react";
import { Heading, HStack, Link } from "@chakra-ui/react";

const Navbar: React.FC = () => {
  return (
    <HStack
      w="100%"
      py="4"
      px="8"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="lg"
    >
      <Heading cursor="pointer">Guardians</Heading>
      <HStack w="10%" justifyContent="space-between">
        <Link href="/">Hospitals</Link>
        <Link href="/profile">Profile</Link>
      </HStack>
    </HStack>
  );
};

export default Navbar;
