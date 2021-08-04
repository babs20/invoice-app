import React, { useState } from 'react';
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
        defaultValue={options[3]}
        name={name}
        className="select-container"
        classNamePrefix="select"
      />
    </div>
  );
};
export default PaymentSelect;
