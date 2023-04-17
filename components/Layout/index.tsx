import { Box } from "@chakra-ui/react";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <Box h={"100vh"} w={"100vw"} bg={"gray.100"}>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
