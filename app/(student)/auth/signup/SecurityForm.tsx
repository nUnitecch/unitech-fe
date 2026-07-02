import FormField from "@/components/Forms/FormField";

export default function SecurityForm() {
  return (
    <div className="space-y-4">
      <FormField
        label="Username"
        name="username"
        placeholder="Enter username"
        required
      />
      <FormField
        label="Password"
        type="password"
        name="password"
        placeholder="Enter password"
        required
      />
      <FormField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Re-try password"
        required
      />
    </div>
  );
}
