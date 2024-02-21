import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import { RiListSettingsLine } from "react-icons/ri";
import { Select, SelectItem, Input, Switch } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addEmployeeEducation } from "../../services/employeeServices";
import { useSelector } from "react-redux";

export default function DegreePopup(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const authInfo = useSelector((state) => state.isAuthenticated.value);

  const schema = yup.object().shape({
    degreeName: yup.string().required("you must enter a degree"),
    school: yup.string().required("you must enter a university or school name"),
    year: yup.number().required("you must enter the year you graduated"),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data, onClose) => {
    console.log(data)
    const response = await addEmployeeEducation(authInfo?.userId, data)
    if (response.status === 200) {
      props.addEducation(data)
      onClose()
      reset()
    }
  }

  const openDialog = (onOpen) => {
    onOpen()
    reset()
  }
  return (
    <>
      <button onClick={() => openDialog(onOpen)}><RiListSettingsLine size={25} className="cursor-pointer hover:text-default-500 duration-300" /></button>
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
                  <Input type="text" variant='flat' size="sm" label="Education degree"  {...register("degreeName")} />
                  <Divider />
                  <div className="flex flex-col gap-2">
                    <h1>
                      Where did you get it
                    </h1>
                    <Input type="text" variant='flat' size="sm" label="College or university" {...register("school")} />
                    <Divider />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1>
                      When did you get it
                    </h1>
                    <Input type="number" min={1960} variant='flat' size="sm" label="Year" {...register("year")} />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  cancel
                </Button>
                <Button color="primary" onPress={handleSubmit((data) => onSubmit(data, onClose))}>
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
