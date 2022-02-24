const useFormInput = (initialvalue) => {
  const [value, setValue] = useState(initialvalue);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return { value, onChange: handleChange, setValue };
};

export default useFormInput;
