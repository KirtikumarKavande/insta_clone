import React, { useState } from "react";

const useForm = (values) => {
  const [form, setForm] = useState(values);

  const handleChange = (e) => {
    setForm((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  return {
    formValues: form,
    handleChange,
    setForm
  };
};

export default useForm;
