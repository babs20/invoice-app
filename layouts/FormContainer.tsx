import { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react';
import {
  Formik,
  Form,
  FieldArray,
  FormikHelpers,
  FormikErrors,
  FormikTouched,
} from 'formik';
import dayjs from 'dayjs';
import classNames from 'classnames';
import * as Yup from 'yup';
import currency from 'currency.js';
import DatePicker from '../components/DatePicker';
import Input from '../components/Input';
import Button from '../components/Button';
import PaymentSelect from '../components/PaymentSelect';
import useClickOutside from '../hooks/useClickOutside';
import {
  ActionTypes,
  Action,
  InvoiceStatus,
  InvoiceType,
  InvoiceArrType,
} from '../utils/types';

interface FormContainerProps {
  isFormOpen: boolean;
  isFormOpenSet: Dispatch<SetStateAction<boolean>>;
  dispatch: React.Dispatch<Action>;
  isEdit: boolean;
  values: InvoiceType;
}

interface NewItemProps {
  index: number;
  nameVal: string;
  quantityVal: number;
  priceVal: number;
  removeItem: () => void;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}
interface FormValues {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: 1 | 7 | 14 | 30;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus | string;
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

//TODO:
// 1) Form Validation
// FOR TESTING
// const intialValues: FormValues = {
//   id: 'XM9141',
//   createdAt: dayjs().format('YYYY-MM-DD'),
//   paymentDue: dayjs().add(1, 'day').format('YYYY-MM-DD'),
//   description: 'Coding',
//   paymentTerms: 30,
//   clientName: 'John Doe',
//   clientEmail: 'doe@mail.com',
//   status: 'pending',
//   senderAddress: {
//     street: '123 Main Street',
//     city: 'New York',
//     postCode: '12345',
//     country: 'United States',
//   },
//   clientAddress: {
//     street: '19 Union Terrace',
//     city: 'London',
//     postCode: 'E1 3EZ',
//     country: 'United Kingdom',
//   },
//   items: [
//     {
//       name: 'Design',
//       quantity: 1,
//       price: 1550,
//       total: 1550,
//     },
//   ],
//   total: 1550,
// };

const AddressSchema = Yup.object().shape({
  street: Yup.string()
    .max(255, "Street can't be longer than 255 characters")
    .required("Street name can't be empty"),
  city: Yup.string()
    .max(255, "City can't be longer than 255 characters")
    .required("City can't be empty"),
  postCode: Yup.string()
    .max(255, "Post code can't be longer than 255 characters")
    .required("Post code can't be empty"),
  country: Yup.string()
    .max(255, "Country can't be longer than 255 characters")
    .required("Country can't be empty"),
});

const ItemSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, "Item name can't be longer than 255 characters")
    .required("Item name can't be empty"),
  quantity: Yup.number()
    .typeError('Price must be a number')
    .min(1, "Quantity can't be less than one")
    .max(2147483647, "Quantity can't be higher than 2,147,483,647")
    .required("Quantity can't be empty"),
  price: Yup.number()
    .typeError('Price must be a number')
    .min(0, "Price can't be less than zero")
    .max(
      9223372036854775807,
      "Item name can't be higher than 9,223,372,036,854,775,807"
    )
    .required("Price can't be empty"),
});

const InvoiceSchema = Yup.object().shape({
  createdAt: Yup.date().required('Please enter a valid date'),
  paymentDue: Yup.date().required('Please enter a valid date'),
  description: Yup.string()
    .max(255, "Description can't be longer than 255 characters")
    .required("Description can't be empty"),
  paymentTerms: Yup.mixed()
    .oneOf([1, 7, 14, 30]) //Change to use Enum
    .required('Must choose a payment term'),
  clientName: Yup.string()
    .max(255, "Client name can't be longer than 255 characters")
    .required("Client name can't be empty"),
  clientEmail: Yup.string()
    .email('Must be a valid email')
    .max(255, "Client email can't be longer than 255 characters")
    .required("Client email can't be empty"),
  status: Yup.mixed().oneOf([
    InvoiceStatus.DRAFT,
    InvoiceStatus.PAID,
    InvoiceStatus.PENDING,
  ]),
  clientAddress: AddressSchema,
  senderAddress: AddressSchema,
  items: Yup.array().of(ItemSchema).required('Must have one item'),
});

export const FormContainer = ({
  dispatch,
  isFormOpen,
  isFormOpenSet,
  isEdit = false,
  values,
}: FormContainerProps): JSX.Element => {
  const intialValues: FormValues = {
    id: values?.id || '',
    createdAt: values?.createdAt || dayjs().format('YYYY-MM-DD'),
    paymentDue:
      dayjs().add(values?.paymentTerms, 'day').format('YYYY-MM-DD') ||
      dayjs().add(30, 'day').format('YYYY-MM-DD'),
    description: values?.description || '',
    paymentTerms: values?.paymentTerms || 30,
    clientName: values?.clientName || '',
    clientEmail: values?.clientEmail || '',
    status: values?.status || InvoiceStatus.PENDING,
    senderAddress: {
      street: values?.senderAddress.street || '',
      city: values?.senderAddress.city || '',
      postCode: values?.senderAddress.postCode || '',
      country: values?.senderAddress.country || '',
    },
    clientAddress: {
      street: values?.clientAddress.street || '',
      city: values?.clientAddress.city || '',
      postCode: values?.clientAddress.postCode || '',
      country: values?.clientAddress.country || '',
    },
    items: values?.items.map((item) => {
      return {
        ...item,
        price: (item.price / 100).toFixed(2),
      };
    }) || [
      {
        name: '',
        quantity: 0,
        price: 0,
        total: 0,
      },
    ],
    total: values?.total || 0,
  };

  const containerRef = useRef<HTMLFormElement>(null);
  useClickOutside(containerRef, isFormOpen, isFormOpenSet);

  // Change class when scrolled to bottom
  const [isScrolled, isScrolledSet] = useState<boolean>(false);
  const [isDraft, isDraftSet] = useState<boolean>(false);
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

  const formSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ): Promise<void> => {
    const items = values.items.map((item) => {
      return {
        ...item,
        total: item.total * 100,
        price: item.price * 100,
      };
    });

    const normalizedValues = {
      ...values,
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      paymentDue: dayjs().add(values.paymentTerms, 'day').format('YYYY-MM-DD'),
      status: isDraft ? InvoiceStatus.DRAFT : InvoiceStatus.PENDING,
      total: values.total * 100,
    };

    await fetch('http://localhost:3000/api/invoices', {
      method: 'POST',
      body: JSON.stringify(normalizedValues, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        dispatch({
          type: ActionTypes.AddInvoice,
          payload: { addInvoice: { ...normalizedValues, items } },
        });
      });

    actions.setSubmitting(false);
    isFormOpenSet(!isFormOpen);
  };

  const editInvoice = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ): Promise<void> => {
    const items = values.items.map((item) => {
      return {
        ...item,
        total: item.price * item.quantity * 100,
        price: item.price * 100,
      };
    });

    const editedInvoice: InvoiceType = {
      ...values,
      items,
      total: Number(values.total),
    };

    console.log(editedInvoice);

    await fetch('http://localhost:3000/api/invoices', {
      method: 'PUT',
      body: JSON.stringify(
        {
          ...editedInvoice,
          statusOnly: false,
        },
        null,
        2
      ),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      dispatch({
        type: ActionTypes.AddInvoice,
        payload: { addInvoice: editedInvoice },
      });
    });

    actions.setSubmitting(false);
    isFormOpenSet(!isFormOpen);
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

  const NewItem = ({
    index,
    nameVal,
    quantityVal,
    priceVal,
    removeItem,
    errors,
    touched,
  }: NewItemProps): JSX.Element => {
    const errorObj =
      errors.items && typeof errors !== 'string' ? errors.items[index] : false;

    return (
      <div className="form__add-item">
        <Input
          name={`items[${index}].name`}
          placeholder="Item Name"
          label="Item Name"
          value={nameVal}
          classes="form__item_name"
          isInvalid={errorObj?.name !== undefined}
          errorMessage={errorObj?.name}
          isTouched={touched.items && touched.items[index]?.name}
        />
        <Input
          name={`items[${index}].quantity`}
          placeholder="2"
          type="number"
          classes="form__quantity"
          label="Qty."
          value={quantityVal}
          isInvalid={errorObj?.quantity !== undefined}
          errorMessage={errorObj?.quantity}
          isTouched={touched.items && touched.items[index]?.quantity}
        />
        <Input
          name={`items[${index}].price`}
          placeholder="200.00"
          label="Price"
          value={priceVal}
          classes="form__price"
          isInvalid={errorObj?.price !== undefined}
          errorMessage={errorObj?.price}
          type="number"
          isTouched={touched.items && touched.items[index]?.price}
        />
        <div className="form__item-total-container">
          <h3>Total</h3>
          <div className="form__item-amount-container">
            <span className="form__item-amount">$</span>
            <span className="form__item-amount">
              {(priceVal * quantityVal).toFixed(2)}
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

  return (
    <Formik
      initialValues={intialValues}
      validationSchema={InvoiceSchema}
      onSubmit={(values, actions) =>
        isEdit ? editInvoice(values, actions) : formSubmit(values, actions)
      }
    >
      {(formik) => (
        <div className={classNames('form', { 'form--is-open': isFormOpen })}>
          <Form
            className="form__container"
            onSubmit={formik.handleSubmit}
            ref={containerRef}
          >
            <button
              className="form__go-back"
              type="button"
              onClick={() => isFormOpenSet(!isFormOpen)}
            >
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
            </button>
            <h2 className="form__title">
              {isEdit ? (
                <>
                  Edit <span className="form__hash">#</span>
                  {formik.values.id}
                </>
              ) : (
                'New Invoice'
              )}
            </h2>
            <fieldset className="form__fieldset">
              <legend className="form__section-title">Bill From</legend>
              <Input
                name="senderAddress.street"
                placeholder="123 Main Street"
                label="Street Address"
                value={formik.values.senderAddress.street}
                isInvalid={formik.errors.senderAddress?.street !== undefined}
                errorMessage={formik.errors.senderAddress?.street}
                isTouched={formik.touched.senderAddress?.street}
              />
              <div className="form__location-container">
                <Input
                  name={'senderAddress.city'}
                  label="City"
                  placeholder="City"
                  value={formik.values.senderAddress.city}
                  isInvalid={formik.errors.senderAddress?.city !== undefined}
                  errorMessage={formik.errors.senderAddress?.city}
                  isTouched={formik.touched.senderAddress?.city}
                />
                <Input
                  name={'senderAddress.postCode'}
                  placeholder="12345"
                  label="Post Code"
                  value={formik.values.senderAddress.postCode}
                  isInvalid={
                    formik.errors.senderAddress?.postCode !== undefined
                  }
                  errorMessage={formik.errors.senderAddress?.postCode}
                  isTouched={formik.touched.senderAddress?.postCode}
                />
                <Input
                  name="senderAddress.country"
                  placeholder="United States"
                  label="Country"
                  value={formik.values.senderAddress.country}
                  isInvalid={formik.errors.senderAddress?.country !== undefined}
                  errorMessage={formik.errors.senderAddress?.country}
                  isTouched={formik.touched.senderAddress?.country}
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
                isInvalid={formik.errors.clientName !== undefined}
                errorMessage={formik.errors.clientName}
                isTouched={formik.touched.clientName}
              />
              <Input
                name="clientEmail"
                placeholder="alexgrim@gmail.com"
                type="email"
                label="Client's Email"
                value={formik.values.clientEmail}
                isInvalid={formik.errors.clientEmail !== undefined}
                errorMessage={formik.errors.clientEmail}
                isTouched={formik.touched.clientEmail}
              />
              <Input
                name="clientAddress.street"
                placeholder="123 Main Street"
                label="Street Address"
                value={formik.values.clientAddress.street}
                isInvalid={formik.errors.clientAddress?.street !== undefined}
                errorMessage={formik.errors.clientAddress?.street}
                isTouched={formik.touched.clientAddress?.street}
              />
              <div className="form__location-container">
                <Input
                  name="clientAddress.city"
                  placeholder="City"
                  label="City"
                  value={formik.values.clientAddress.city}
                  isInvalid={formik.errors.clientAddress?.city !== undefined}
                  errorMessage={formik.errors.clientAddress?.city}
                  isTouched={formik.touched.clientAddress?.city}
                />
                <Input
                  name="clientAddress.postCode"
                  placeholder="12345"
                  label="Post Code"
                  value={formik.values.clientAddress.postCode}
                  isInvalid={
                    formik.errors.clientAddress?.postCode !== undefined
                  }
                  errorMessage={formik.errors.clientAddress?.postCode}
                  isTouched={formik.touched.clientAddress?.postCode}
                />
                <Input
                  name="clientAddress.country"
                  placeholder="United States"
                  label="Country"
                  value={formik.values.clientAddress.country}
                  isInvalid={formik.errors.clientAddress?.country !== undefined}
                  errorMessage={formik.errors.clientAddress?.country}
                  isTouched={formik.touched.clientAddress?.country}
                />
              </div>
              <div className="form__invoice-info">
                <DatePicker name="createdAt" isDisabled={isEdit} />
                <PaymentSelect name="paymentTerms" />
                <Input
                  name="description"
                  placeholder="Graphic Design"
                  label="Project Description"
                  value={formik.values.description}
                  isInvalid={formik.errors.description !== undefined}
                  errorMessage={formik.errors.description}
                  isTouched={formik.touched.description}
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
                        removeItem={() =>
                          formik.values.items.length > 1 &&
                          arrayHelpers.remove(index)
                        }
                        errors={formik.errors}
                        touched={formik.touched}
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
              {isEdit ? (
                <div className="form__buttons--edit">
                  <div>
                    <Button
                      text="Cancel"
                      isEdit
                      onClick={() => {
                        isFormOpenSet(!isFormOpen);
                        formik.handleReset();
                      }}
                    />
                  </div>
                  <div className="form__save">
                    <Button text="Save Changes" type="submit" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="form__discard">
                    <Button
                      text="Discard"
                      isEdit
                      onClick={() => {
                        isFormOpenSet(!isFormOpen);
                        formik.handleReset();
                      }}
                    />
                  </div>
                  <div className="form__draft">
                    <Button text="Save as Draft" isSaveAsDraft type="submit" />
                  </div>
                  <div className="form__save">
                    <Button text="Save &amp; Send" type="submit" />
                  </div>
                </>
              )}
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default FormContainer;
