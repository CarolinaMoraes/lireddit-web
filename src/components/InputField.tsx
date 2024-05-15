import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  textarea?: boolean;
  label: string;
  name: string;
};

type InputProps = InputFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputField: React.FC<InputProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>

      {textarea ?
        <Textarea {...field} id={field.name} {...props}></Textarea> :
        <Input type="text" {...field} {...props} id={field.name} placeholder=""></Input>
      }

      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
