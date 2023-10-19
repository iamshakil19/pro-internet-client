import { DatePicker, DatePickerProps, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

type DatePikerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  label?: string;
  value?: Dayjs;
  size?: "large" | "small";
  required?: boolean;
  placeholder?: string;
};

const FormDatePicker = ({
  name,
  label,
  onChange,
  size = "large",
  required,
  placeholder,
}: DatePikerProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;
    setValue(name, date);
  };

  return (
    <div>
      <div className="">
        {required ? <span className="text-red-500 mr-1">*</span> : null}
        {label ? label : null}
      </div>
      <br />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            defaultValue={dayjs(field.value) || Date.now()}
            size={size}
            onChange={handleOnChange}
            style={{ width: "100%" }}
            placeholder={placeholder}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </div>
  );
};

export default FormDatePicker;
