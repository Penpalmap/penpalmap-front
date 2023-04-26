import { Box, Button } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { ProfileFormData } from "../../types";
import { useForm } from "react-hook-form";
import ProfileGenderInput from "./ProfileGenderInput";

const CreateProfile = () => {
  const { register, handleSubmit, setValue } = useForm<ProfileFormData>({
    mode: "onChange",
  });

  const [step, setStep] = useState(1);

  const handleNextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log(data); // Ici vous pouvez envoyer les données du formulaire vers votre serveur
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ProfileGenderInput />;
      case 2:
        return <ProfileGenderInput />;
      case 3:
        return <ProfileGenderInput />;
      case 4:
        return <ProfileGenderInput />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <h1>create profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderStep()}
        {step !== 1 && (
          <Button type="button" onClick={handlePreviousStep}>
            Précédent
          </Button>
        )}
        {step}
        {step !== 4 && <Button onClick={handleNextStep}>Suivant</Button>}
        {step === 4 && <Button type="submit">Terminer</Button>}
      </form>
    </Box>
  );
};

export default CreateProfile;
