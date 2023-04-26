import { Box } from "@chakra-ui/react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

type Props = {
  onNextStep?: () => void;
  onPreviousStep?: () => void;
  register?: UseFormRegister<FormData>;
  setValue?: UseFormSetValue<FormData>;
};

const ProfilePhotoUpload = (props: Props) => {
  return (
    <Box>
      <h1>create profile Photo</h1>
    </Box>
  );
};

export default ProfilePhotoUpload;
