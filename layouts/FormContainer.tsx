import DatePicker from '../components/DatePicker';
import Input from '../components/Input';
import Button from '../components/Button';
import { Formik, Form, FieldArray } from 'formik';
import currency from 'currency.js';
import { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react';
import classNames from 'classnames';
import useClickOutside from '../hooks/useClickOutside';
import dayjs from 'dayjs';
import PaymentSelect from '../components/PaymentSelect';

interface FormContainerProps {
  isFormOpen: boolean;
  isFormOpenSet: Dispatch<SetStateAction<boolean>>;
}

export const FormContainer = ({
  isFormOpen,
  isFormOpenSet,
}: FormContainerProps): JSX.Element => {
  interface FormValues {
    id: string;
    createdAt: string;
    paymentDue: string;
    description: string;
    paymentTerms: number;
    clientName: string;
    clientEmail: string;
    status: string;
    senderAddress: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    clientAddress: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    items: {
      name: string;
      quantity: number;
      price: number;
      total: number;
    }[];
    total: number;
  }

  // FOR TESTING
  const intialValues: FormValues = {
    id: 'ABC12343',
    createdAt: dayjs().format('YYYY-MM-DD'),
    paymentDue: dayjs('08-11-2021').format('YYYY-MM-DD'),
    description: 'Coding',
    paymentTerms: 1,
    clientName: 'John Doe',
    clientEmail: 'doe@mail.com',
    status: 'pending',
    senderAddress: {
      street: '123 Main Street',
      city: 'New York',
      postCode: '12345',
      country: 'United States',
    },
    clientAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    items: [
      {
        name: 'Design',
        quantity: 1,
        price: 1000,
        total: 1000,
      },
    ],
    total: 1000,
  };

  // const intialValues: FormValues = {
  //   id: '',
  //   createdAt: '',
  //   paymentDue: dayjs().format('YYYY-MM-DD'),
  //   description: '',
  //   paymentTerms: 0,
  //   clientName: '',
  //   clientEmail: '',
  //   status: '',
  //   senderAddress: {
  //     street: '',
  //     city: '',
  //     postCode: '',
  //     country: '',
  //   },
  //   clientAddress: {
  //     street: '',
  //     city: '',
  //     postCode: '',
  //     country: '',
  //   },
  //   items: [
  //     {
  //       name: '',
  //       quantity: 0,
  //       price: 0,
  //       total: 0,
  //     },
  //   ],
  //   total: 0,
  // };

  const containerRef = useRef<HTMLFormElement>(null);
  useClickOutside(containerRef, isFormOpen, isFormOpenSet);

  // Change class when scrolled to bottom
  const [isScrolled, isScrolledSet] = useState<boolean>(false);
  useEffect(() => {
    const formContainer: HTMLDivElement | null = document.querySelector(
      '.form__container'
    );

    if (formContainer) {
      const checkScroll = (e: Event): void => {
        if (e.target) {
          const element: HTMLDivElement = e.target as HTMLDivElement;
          const formHeight = formContainer.scrollHeight;
          const scrollTop = element.scrollTop;
          const clientHeight = Math.round(
            element.clientHeight + element.clientHeight * 0.1
          ); // Fade out 10% above bottom of div

          if (formHeight - Math.abs(scrollTop) <= clientHeight) {
            isScrolledSet(true);
          } else if (
            formHeight - Math.abs(scrollTop) > clientHeight &&
            isScrolled
          ) {
            isScrolledSet(false);
          }
        }
      };

      formContainer.onscroll = checkScroll;
    }
  }, [isScrolled]);

  interface NewItemProps {
    index: number;
    nameVal: string;
    quantityVal: number;
    priceVal: number;
    removeItem: () => void;
  }

  const NewItem = ({
    index,
    nameVal,
    quantityVal,
    priceVal,
    removeItem,
  }: NewItemProps): JSX.Element => {
    return (
      <div className="form__add-item">
        <Input
          name={`items[${index}].name`}
          placeholder="Item Name"
          label="Item Name"
          value={nameVal}
          classes="form__item_name"
        />
        <Input
          name={`items[${index}].quantity`}
          placeholder="2"
          type="number"
          classes="form__quantity"
          label="Qty."
          value={quantityVal}
        />
        <Input
          name={`items[${index}].price`}
          placeholder="200.00"
          label="Price"
          value={currency(priceVal).format()}
          classes="form__price"
        />
        <div className="form__item-total-container">
          <h3>Total</h3>
          <div className="form__item-amount-container">
            <span className="form__item-amount">
              {currency(quantityVal * priceVal).format()}
            </span>
            <button type="button" onClick={removeItem}>
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
            </button>
          </div>
        </div>
      </div>
    );
  };

  const scrollToBottom = (): void => {
    const formContainer: HTMLDivElement | null = document.querySelector(
      '.form__container'
    );

    // This is a bad way of doing this.
    setTimeout(() => {
      if (formContainer) {
        formContainer.scroll({
          top: formContainer.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  return (
    <Formik
      initialValues={intialValues}
      onSubmit={async (values, actions) => {
        console.log('values', JSON.stringify(values, null, 2));
        fetch('http://localhost:3000/api/invoices', {
          method: 'POST',
          body: JSON.stringify(values, null, 2),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        actions.setSubmitting(false);
      }}
    >
      {(formik) => (
        <div className={classNames('form', { 'form--is-open': isFormOpen })}>
          <Form
            className="form__container"
            onSubmit={formik.handleSubmit}
            ref={containerRef}
          >
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
              <Input
                name="senderAddress.street"
                placeholder="123 Main Street"
                label="Street Address"
                value={formik.values.senderAddress.street}
              />
              <div className="form__location-container">
                <Input
                  name={'senderAddress.city'}
                  label="City"
                  placeholder="City"
                  value={formik.values.senderAddress.city}
                />
                <Input
                  name={'senderAddress.postCode'}
                  placeholder="12345"
                  label="Post Code"
                  value={formik.values.senderAddress.postCode}
                />
                <Input
                  name="senderAddress.country"
                  placeholder="United States"
                  label="Country"
                  value={formik.values.senderAddress.country}
                />
              </div>
            </fieldset>
            <fieldset className="form__fieldset form__fieldset--bill-to">
              <legend className="form__section-title">Bill To</legend>
              <Input
                name="clientName"
                placeholder="Alex Grim"
                label="Client's Name"
                value={formik.values.clientName}
              />
              <Input
                name="clientEmail"
                placeholder="alexgrim@gmail.com"
                type="email"
                label="Client's Email"
                value={formik.values.clientEmail}
              />
              <Input
                name="clientAddress.street"
                placeholder="123 Main Street"
                label="Street Address"
                value={formik.values.clientAddress.street}
              />
              <div className="form__location-container">
                <Input
                  name="clientAddress.city"
                  placeholder="City"
                  label="City"
                  value={formik.values.clientAddress.city}
                />
                <Input
                  name="clientAddress.postCode"
                  placeholder="12345"
                  label="Post Code"
                  value={formik.values.clientAddress.postCode}
                />
                <Input
                  name="clientAddress.country"
                  placeholder="United States"
                  label="Country"
                  value={formik.values.clientAddress.country}
                />
              </div>
              <div className="form__invoice-info">
                <DatePicker name="createdAt" />
                <PaymentSelect name="paymentTerms" />
                <Input
                  name="description"
                  placeholder="Graphic Design"
                  label="Project Description"
                  value={formik.values.description}
                />
              </div>
            </fieldset>
            <FieldArray
              name="items"
              render={(arrayHelpers) => (
                <fieldset className="form__fieldset form__fieldset--item-list">
                  <legend className="form__item-list">Item List</legend>
                  {formik.values.items.map((item, index) => {
                    return (
                      <NewItem
                        key={index}
                        nameVal={item.name}
                        quantityVal={item.quantity}
                        priceVal={item.price}
                        index={index}
                        removeItem={() => arrayHelpers.remove(index)}
                      />
                    );
                  })}
                  <Button
                    text="+ Add New Item"
                    isAddNewItem
                    onClick={() => {
                      arrayHelpers.push({
                        name: '',
                        quantity: 0,
                        price: 0,
                        total: 0,
                      });
                      scrollToBottom();
                    }}
                  />
                </fieldset>
              )}
            />
            <div
              className={classNames('form__button-container', {
                'form__button-container--scrolled': isScrolled,
              })}
            >
              <div className="form__discard">
                <Button
                  text="Discard"
                  isEdit
                  onClick={() => isFormOpenSet(!isFormOpen)}
                />
              </div>
              <div className="form__draft">
                <Button text="Save as Draft" isSaveAsDraft />
              </div>
              <div className="form__save">
                <Button text="Save &amp; Send" type="submit" />
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default FormContainer;
