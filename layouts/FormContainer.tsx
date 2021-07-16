export const FormContainer = (): JSX.Element => {
  return (
    <form className="form">
      <h2>New Invoice</h2>
      <fieldset>
        <legend>Bill From</legend>
        {/* {Insert Input Elements} */}
      </fieldset>
      <fieldset>
        <legend>Bill To</legend>
        {/* {Insert Input Elements} */}
      </fieldset>
      <fieldset>
        <legend>Item List</legend>
        {/* {Insert Input Elements} */}
      </fieldset>
    </form>
  );
};
export default FormContainer;
