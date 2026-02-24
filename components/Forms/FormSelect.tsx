"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FormLabel from "./FormLabel";

interface FormSelectProps {
  placeholder: string;
  label: string;
  name: string;
  options: { value: string; label: string }[];
  groupLabel: string;
  required?: boolean;
}

export default function FormSelect({
  placeholder,
  label,
  name,
  options,
  groupLabel,
  required = false,
}: FormSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <div>
      <FormLabel name={name} label={label} required={required} />
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${name} required!` : false }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value ?? ""}>
            <SelectTrigger
              id={name}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
              className={`w-full h-12 py-5 rounded transition-all
                ${
                  error
                    ? "border-red-500 bg-red-50/50 focus:ring-red-500"
                    : "border-border focus:ring-2 focus:ring-logo/20 focus:border-logo"
                }`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup>
                <SelectLabel>{groupLabel}</SelectLabel>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}
