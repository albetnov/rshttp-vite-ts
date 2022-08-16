import {
  Badge,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { sanctumAuth } from "../../Utils/ApiInterface";

export default function SanctumOptions({
  onUrlChanged,
  onCredCheck,
  onStatusChange,
  url,
  status,
  credCheck,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const RenderBadge = () => {
    if (status) {
      return (
        <Badge ml={2} colorScheme="green">
          Enabled
        </Badge>
      );
    }

    return (
      <Badge ml={2} colorScheme="red">
        Disabled
      </Badge>
    );
  };

  const RenderButton = () => {
    if (status) {
      return (
        <Button type="submit" variant="ghost" colorScheme="red">
          Disable
        </Button>
      );
    }
    return (
      <Button type="submit" variant="ghost" colorScheme="green">
        Enable
      </Button>
    );
  };

  const toggleSanctum = (e) => {
    e.preventDefault();
    onStatusChange((prevValue) => !prevValue);
  };

  const requestCsrf = async () => {
    try {
      setIsLoading(true);
      await sanctumAuth({ url, credCheck, status });
      console.log("Cookie secured.");
    } catch (err) {
      console.log("Failed to secure cookie: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  const AttemptCsrfButton = () => {
    if (isLoading) {
      return (
        <Button colorScheme="blue" isLoading loadingText="Fetching...">
          Attempt CSRF Token (Single Time)
        </Button>
      );
    }
    return (
      <Button colorScheme="blue" onClick={requestCsrf}>
        Attempt CSRF Token (Single Time)
      </Button>
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box my={3}>
      <Button onClick={onOpen} colorScheme="twitter">
        Sanctum Options <RenderBadge />
      </Button>

      <Modal blockScrollOnMount isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sanctum Options</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={toggleSanctum}>
            <ModalBody>
              <FormControl>
                <FormLabel htmlFor="url">URL</FormLabel>
                <Input
                  id="url"
                  name="url"
                  value={url}
                  onChange={(e) => onUrlChanged(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Checkbox
                  id="credCheck"
                  name="credCheck"
                  isChecked={credCheck}
                  onChange={(e) => onCredCheck(e.target.checked)}
                >
                  With Cresidentials?
                </Checkbox>
              </FormControl>
              <FormControl mt={3}>
                <AttemptCsrfButton />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <RenderButton />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
