import { useToast } from "@chakra-ui/react";

export const ToastSuccess = (title = "Success", description = "") => {
  const toast = useToast();
  return toast({
    status: "success",
    title: title,
    description: description,
    duration: 2000,
    isClosable: true,
    position: "top",
  });
};

export const ToastError = (title = "Error", description = "") => {
  const toast = useToast();
  return toast({
    status: "error",
    title: title,
    description: description,
    duration: 2000,
    isClosable: true,
    position: "top",
  });
};
