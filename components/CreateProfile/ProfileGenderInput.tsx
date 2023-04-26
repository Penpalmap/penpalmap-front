import { Box } from "@chakra-ui/react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

type Props = {
  onNextStep?: () => void;
  onPreviousStep?: () => void;
  register?: UseFormRegister<FormData>;
  setValue?: UseFormSetValue<FormData>;
};

const ProfileGenderInput = (props: Props) => {
  return (
    <Box>
      <h1>create profile Gender</h1>
    </Box>
  );
};

export default ProfileGenderInput;
