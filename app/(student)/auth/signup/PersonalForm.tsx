import FormField from "@/components/Forms/FormField";
import FormSelect from "@/components/Forms/FormSelect";
import { genderOptions } from "@/constants/signupFields";

export default function PersonalForm() {
  return (
    <div className="space-y-4">
      <FormField
        label="Fullname"
        name="fullname"
        placeholder="John Doe"
        required
      />
      <FormField
        label="Email"
        type="email"
        name="email"
        placeholder="johndoe@example.com"
        required
      />
      <FormSelect
        placeholder="Select your gender"
        label="Gender"
        groupLabel="Genders"
        name="gender"
        options={genderOptions}
        required
      />
    </div>
  );
}
