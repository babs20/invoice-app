import DatePicker from '../components/DatePicker';
import Input from '../components/Input';
import Button from '../components/Button';

// TODO: Add State Management
// TODO: Add Responsive Design
// TODO: Add Button Functionality
// TODO: Replace calendar with a library and style according
// TODO: Add drop down element
// TODO: Integrate into main page usage
export const FormContainer = (): JSX.Element => {
  const NewItem = (): JSX.Element => {
    return (
      <div className="form__add-item">
        <Input name={'Item Name'} placeholder="Item Name" />
        <Input
          name={'Qty.'}
          placeholder="2"
          type="number"
          classes="form__quantity"
        />
        <Input name={'Price'} placeholder="200.00" />
        <div className="form__item-total-container">
          <h3>Total</h3>
          <div className="form__item-amount-container">
            <span className="form__item-amount">400.00</span>
            <svg
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.44442 0L9.33333 0.888875H12.4444V2.66667H0V0.888875H3.11108L4 0H8.44442ZM2.66667 16C1.68442 16 0.888875 15.2045 0.888875 14.2222V3.55554H11.5555V14.2222C11.5555 15.2045 10.76 16 9.77779 16H2.66667Z"
                fill="#888EB0"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <form className="form">
        <div className="form__go-back">
          <svg
            width="8"
            height="10"
            viewBox="0 0 8 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.11401 9.22754L1.88611 4.99964L6.11401 0.771736"
              stroke="#7C5DFA"
              strokeWidth="2"
            />
          </svg>
          <span>Go back</span>
        </div>
        <h2 className="form__title">New Invoice</h2>
        <fieldset className="form__fieldset">
          <legend className="form__section-title">Bill From</legend>
          <Input name={'Street Address'} placeholder="123 Main Street" />
          <div className="form__location-container">
            <Input name={'City'} placeholder="City" />
            <Input name={'Post Code'} placeholder="12345" />
            <Input name={'Country'} placeholder="United States" />
          </div>
        </fieldset>
        <fieldset className="form__fieldset form__fieldset--bill-to">
          <legend className="form__section-title">Bill To</legend>
          <Input name={"Client's Name"} placeholder="Alex Grim" />
          <Input
            name={"Client's Email"}
            placeholder="alexgrim@gmail.com"
            type="email"
          />
          <Input name={'Street Address'} placeholder="123 Main Street" />
          <div className="form__location-container">
            <Input name={'City'} placeholder="City" />
            <Input name={'Post Code'} placeholder="12345" />
            <Input name={'Country'} placeholder="United States" />
          </div>
          <div className="form__invoice-info">
            <DatePicker />
            <Input name={'Payment Terms'} placeholder="Next 30 Days" />
            <Input name={'Project Description'} placeholder="Graphic Design" />
          </div>
        </fieldset>
        <fieldset className="form__fieldset form__fieldset--item-list">
          <legend className="form__item-list">Item List</legend>
          <NewItem />
          <Button text="+ Add New Item" isAddNewItem />
        </fieldset>
      </form>
      <div className="form__button-container">
        <Button text="Discard" isEdit isMini />
        <Button text="Save as Draft" isSaveAsDraft isMini />
        <Button text="Save &amp; Send" isMini />
      </div>
    </>
  );
};
export default FormContainer;
