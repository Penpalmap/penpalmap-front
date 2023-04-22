import { Box } from "@chakra-ui/react";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <Box h={"100vh"} w={"100vw"}>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
