import React from 'react';
import Select from 'react-select';
import { useFormikContext, useField } from 'formik';

const options = [
  { value: 1, label: 'Next 1 Day' },
  { value: 7, label: 'Next 7 Days' },
  { value: 14, label: 'Next 14 Days' },
  { value: 30, label: 'Next 30 Days' },
];

const PaymentSelect = ({ name }: { name: string }): JSX.Element => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const getDefaultValue = (): { value: number; label: string } => {
    switch (true) {
      case field.value === 1:
        return { value: 1, label: 'Next 1 Day' };
      case field.value === 7:
        return { value: 7, label: 'Next 7 Days' };
      case field.value === 14:
        return { value: 14, label: 'Next 14 Days' };
      case field.value === 30:
        return { value: 30, label: 'Next 30 Days' };
      default:
        return { value: 30, label: 'Next 30 Days' };
    }
  };

  return (
    <div className="select">
      <label htmlFor={name} className="input__label">
        Payment Due
      </label>
      <Select
        options={options}
        onChange={(option) => {
          if (option) {
            setFieldValue(field.name, option.value);
          }
        }}
        defaultValue={getDefaultValue()}
        name={name}
        className="select-container"
        classNamePrefix="select"
        inputId={name}
      />
    </div>
  );
};
export default PaymentSelect;
