import FormField from "@/components/Forms/FormField";

export default function ContactForm() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        label="WhatsApp"
        name="whatsappNumber"
        type="tel"
        placeholder="+234..."
      />
      <FormField
        label="Calling Number"
        name="callingNumber"
        type="tel"
        placeholder="+234..."
      />
      <div className="md:col-span-2">
        <FormField
          label="Address"
          name="address"
          type="textarea"
          placeholder="Residential address"
          required
        />
      </div>
      <FormField
        label="Guardian Name"
        name="guardianName"
        placeholder="Enter guardian name"
      />
      <FormField
        label="Guardian Number"
        placeholder="Enter guardian number"
        name="guardianNumber"
        type="tel"
      />
    </div>
  );
}
