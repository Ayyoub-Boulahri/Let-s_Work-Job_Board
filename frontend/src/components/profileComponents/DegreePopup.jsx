import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import { RiListSettingsLine } from "react-icons/ri";
import { Select, SelectItem, Input, Switch } from "@nextui-org/react";


export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}><RiListSettingsLine size={25} className="cursor-pointer hover:text-default-500 duration-300" /></button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[20px]">New degree</ModalHeader>
              <ModalBody className="popupModel">
                <div className="flex flex-col gap-2">
                  <h1>
                    Choose your education degree
                  </h1>
                   <Input type="text" variant='flat' label="Education degree" />
                  <Divider />
                  <div className="flex flex-col gap-2">
                  <h1>
                    Where did you get it
                  </h1>
                  <Input type="text" variant='flat' label="College or university" />
                  <Divider />
                  </div>
                  <div className="flex flex-col gap-2">
                  <h1>
                    When did you get it
                  </h1>
                  <Input type="number" variant='flat' label="Year" />
                  
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
