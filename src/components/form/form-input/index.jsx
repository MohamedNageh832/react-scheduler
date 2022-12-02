const FormInput = (props) => {
  const { label, id, ...otherProps } = props || {};

  return (
    <section className="form__group">
      {label && (
        <label className="sidebar__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} className="form__input" {...otherProps} />
    </section>
  );
};

export default FormInput;
