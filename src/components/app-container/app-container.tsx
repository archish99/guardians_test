import { Box } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/navbar";

interface Props {
  children: React.ReactNode;
}

const AppContainer: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  let height;

  if (location.pathname.includes("profile")) {
    height = {
      minH: "100vh",
    };
  } else {
    height = {
      h: "100vh",
    };
  }

  return (
    <Box bg="#F5F5F5" {...height}>
      <Navbar />
      {children}
    </Box>
  );
};

export default AppContainer;
