import FormField from '@/components/Forms/FormField'
import FormSelect from '@/components/Forms/FormSelect'
import { campusOptions, departmentOptions, facultyOptions, levelOptions } from '@/constants/signupFields';


export default function AcademicForm() {
  return (
    <div className="space-y-4">
      <FormField
        label="Matric Number"
        type="number"
        name="matricNo"
        placeholder="2206732"
        required
      />
      <FormSelect
        label="Campus"
        name="campus"
        placeholder="Select Campus"
        groupLabel="Campus"
        options={campusOptions}
        required
      />
      <FormSelect
        label="Faculty"
        name="faculty"
        options={facultyOptions}
        placeholder="Select Faculty"
        groupLabel="Faculty"
        required
      />
      <FormSelect
        label="Department"
        name="department"
        placeholder="Select Department"
        groupLabel="Department"
        options={departmentOptions}
        required
      />
      <FormSelect
        label="Level"
        placeholder="Select Level"
        groupLabel="Level"
        name="level"
        options={levelOptions}
        required
      />
    </div>
  );
}
