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
                <Divider />

                  <div className="flex justify-between py-2">
                    <h1 className='font-bold text-default-600 text-[16px]'>Only Open Jobs</h1>
                    <Switch size="sm"/>
                  </div>
                  <Divider />
                  <h1>Salary range per month</h1>
                  <div className="flex gap-10 justify-center">
                    <Input
                      label="Min"
                      placeholder="0.00"
                      labelPlacement="outside"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      endContent={
                        <div className="flex items-center">
                          <label className="sr-only" htmlFor="currency">
                            Currency
                          </label>
                          <select
                            className="outline-none border-0 bg-transparent text-default-400 text-small"
                            id="currency"
                            name="currency"
                          >
                            <option>USD</option>
                            <option>ARS</option>
                            <option>EUR</option>
                          </select>
                        </div>
                      }
                      type="number"
                    />
                    <Input
                      label="Max"
                      placeholder="0.00"
                      labelPlacement="outside"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      endContent={
                        <div className="flex items-center">
                          <label className="sr-only" htmlFor="currency">
                            Currency
                          </label>
                          <select
                            className="outline-none border-0 bg-transparent text-default-400 text-small"
                            id="currency"
                            name="currency"
                          >
                            <option>USD</option>
                            <option>ARS</option>
                            <option>EUR</option>
                          </select>
                        </div>
                      }
                      type="number"
                    />
                  </div>
                </div>
                <Divider />
                <div className="flex flex-col gap-2">
                  <h1>Date Posted</h1>
                  <Select
                    size={"sm"}
                    label="Select a date"
                  >
                    <SelectItem value="cat">
                      cat
                    </SelectItem>
                  </Select>
                </div>
                <Divider />
                <div className="flex flex-col gap-2">
                  <h1>Jobs Type</h1>
                  <Select
                    size={"sm"}
                    label="Select a job type"
                  >
                    <SelectItem value="cat">
                      cat
                    </SelectItem>
                  </Select>
                </div>
                <Divider />
                <div className="flex flex-col gap-2">
                  <h1>City</h1>
                  <Select
                    size={"sm"}
                    label="Select a city"
                  >
                    <SelectItem value="cat">
                      cat
                    </SelectItem>
                  </Select>
                </div>
                <Divider />
                <div className="flex flex-col gap-2">
                  <h1>Industry</h1>
                  <Select
                    size={"sm"}
                    label="Select an industry"
                  >
                    <SelectItem value="cat">
                      cat
                    </SelectItem>
                  </Select>
                </div>
                <Divider />
                <div className="flex flex-col gap-2">
                  <h1>Company</h1>
                  <Select
                    size={"sm"}
                    label="Select a company"
                  >
                    <SelectItem value="cat">
                      cat
                    </SelectItem>
                  </Select>
                </div>
                <Divider />
                <div className="flex flex-col gap-2">
                  <h1>Company size</h1>
                  <Select
                    size={"sm"}
                    label="Select a size"
                  >
                    <SelectItem value="cat">
                      cat
                    </SelectItem>
                  </Select>
                </div>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
