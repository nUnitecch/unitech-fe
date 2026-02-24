"use client";

import { useFormContext } from "react-hook-form";
import FormLabel from "./FormLabel";

interface FormFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  label: string;
  required?: boolean;
}

export default function FormField({
  name,
  type = "text",
  placeholder,
  label,
  required = false,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <div className="inputField">
      <FormLabel name={name} label={label} required={required} />
      {type === "textarea" ? (
        <textarea
          id={name}
          placeholder={placeholder}
          className={`border w-full rounded p-2 min-h-20 transition-all ${
            error
              ? "border-red-500 bg-red-50 focus:ring-red-500"
              : "border-border focus:ring-2 focus:ring-logo/20 focus:border-logo"
          }`}
          {...register(name, { required })}
        ></textarea>
      ) : (
        <input
          type={type || "text"}
          id={name}
          placeholder={placeholder}
          className={`border w-full h-13 rounded transition-all px-2 ${
            error
              ? "border-red-500 bg-red-50 focus:ring-red-500"
              : "border-border focus:ring-2 focus:ring-logo/20 focus:border-logo"
          }`}
          {...register(name, { required })}
        />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
