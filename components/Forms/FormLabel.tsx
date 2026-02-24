type FormLabelProps = {
  name: string;
  label: string;
  required: boolean;
};

export default function FormLabel({ name, label, required }: FormLabelProps) {
  return (
    <label
      htmlFor={name}
      className="text-sm font-medium leading-none mb-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  );
}
