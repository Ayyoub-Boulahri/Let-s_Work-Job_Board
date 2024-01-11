import React from "react";
import {Input} from "@nextui-org/react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";


export default function PasswordInput(props) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      label={props.label}
      variant="bordered"
      placeholder={props.placeholder}
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
    />
  );
}