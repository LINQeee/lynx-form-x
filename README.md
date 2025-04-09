# LynxFormX

LynxFormX is a lightweight and intuitive form library built for the Lynx framework for mobile development. It streamlines form management by automatically binding fields, handling validation, and providing easy-to-use hooks for custom field manipulation—all with strong TypeScript support.

---

## Features

- **Declarative API:**  
  Define forms with `<Form>`, bind inputs with `<Field>`, show errors with `<Error>`, and submit with `<SubmitButton>`.

- **Validation Options:**

  - **Zod Schema:** Use a Zod schema for validation by providing the `schema` prop (only accepts Zod).
  - **Custom Validation:** Alternatively, pass a `validation` function that returns an object with field names as keys and error messages as values.

- **Flexible Submission:**  
  The `onSubmit` function receives form values as the first parameter, and a helpers object with `setValue` and `setError` functions as the second parameter, enabling you to update values and set errors for any field.

- **Type-Safe Forms:**  
  Form structure is inferred from `initialValues` (optional) or provided via generics (e.g., `<Form<FormValues>>`). Unlike Formik, you do not need to supply `initialValues` to define the form structure—the structure is formed by the `<Field>` components.

- **Custom Field Manipulation:**  
  For more advanced use cases, use the `useField` hook to access a field's `value`, `error`, `touched` status, and helper functions `setValue` and `setError` for granular control.

- **Smart Submit Button:**  
  `<SubmitButton>` optionally accepts `disableOnSubmit` and `disabledClassName` props. It automatically performs validation and triggers `onSubmit` upon successful validation.

- **Standard Attribute Forwarding:**  
  All components pass standard attributes to their underlying tags:
  - **Form** forwards props to `<view>`
  - **SubmitButton** forwards props to `<view>`
  - **Error** forwards props to `<text>`
  - **Field** forwards props to `<input>`

---

## Installation

Install LynxFormX via npm:

```bash
npm install lynx-form-x
```

---

## Usage

### Basic Form Example

Below is a basic example using a Zod schema for validation:

```tsx
import { z } from 'zod';
import { Form, Field, Error, SubmitButton } from 'lynx-form-x';

interface FormValues {
  login: string;
  password: string;
}

const schema = z.object({
  login: z.string().nonempty('Enter login'),
  password: z.string().nonempty('Enter password'),
}));

export function App() {
  return (
    <Form<FormValues>
      schema={schema}
      onSubmit={async (values, { setValue, setError }) => {
        console.log(values);
        // Perform submission logic here
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }}
    >
      <Field name="login" />
      <Error name="login" />
      <Field name="password" />
      <Error name="password" />
      <SubmitButton
        className="button"
        disableOnSubmit
        disabledClassName="disabled"
      >
        Submit
      </SubmitButton>
    </Form>
  );
}
```

### Using Custom Validation Function

If you prefer a custom validation function, simply pass it as the `validation` prop:

```tsx
import {Form, Field, Error, SubmitButton, Errors} from 'lynx-form-x'

interface FormValues {
  email: string
  username: string
}

const customValidation = (values: FormValues) => {
  const errors: Errors<FormValues> = {}
  if (!values.email.includes('@')) {
    errors.email = 'Invalid email address'
  }
  if (values.username.length < 3) {
    errors.username = 'Username must be at least 3 characters'
  }
  return errors
}

export function App() {
  return (
    <Form<FormValues>
      validation={customValidation}
      onSubmit={(values, {setValue, setError}) => {
        console.log(values)
      }}
    >
      <Field name='email' />
      <Error name='email' />
      <Field name='username' />
      <Error name='username' />
      <SubmitButton
        className='button'
        disableOnSubmit
        disabledClassName='disabled'
      >
        Submit
      </SubmitButton>
    </Form>
  )
}
```

### Advanced Usage with `useField`

For more granular control over individual fields, use the `useField` hook:

```tsx
import {useField} from 'lynx-form-x'

interface FormValues {
  firstName: string
  lastName: string
}

export function CustomInput({name}: {name: keyof FormValues}) {
  const {value, error, touched, setValue, setError} = useField(name)

  // some custom logic

  return (
    <view>
      <Field name={name} />
      {error && touched && <text>{error}</text>}
      /* some custom layout */
    </view>
  )
}

export function App() {
  return (
    <Form<FormValues>
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <CustomInput name='firstName' />
      <CustomInput name='lastName' />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
```

---

## API Reference

### `<Form>`

- **Props:**
  - `initialValues?`: _(optional)_ Object with initial form values.
  - `schema?`: _(optional)_ A Zod schema used for validation.
  - `validation?`: _(optional)_ A custom validation function. Should return an object
    where keys are field names and values are error messages.
  - `onSubmit`: Function called on form submission. Receives two arguments:
    1. `values`: The current form values.
    2. `helpers`: An object containing `setValue` and `setError` functions to update any field.

### `<Field>`

- **Props:**
  - `name`: The field name. The library binds the input to this name in the form state.

### `<Error>`

- **Props:**
  - `name`: The field name to display an error for.

### `<SubmitButton>`

- **Props:**
  - `disableOnSubmit?`: _(optional)_ If true, disables the button during form submission.
  - `disabledClassName?`: _(optional)_ CSS class applied when the button is disabled.
- **Behavior:**
  - Automatically validates the form and triggers `onSubmit` upon successful validation.

### `useField` Hook

- **Usage:**
  - Accepts a field name.
  - Returns an object with:
    - `value`: Current field value.
    - `error`: Current field error.
    - `touched`: Whether the field has been touched.
    - `setValue`: Function to update the field value.
    - `setError`: Function to update the field error.

---

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check [issues page](https://github.com/linqeee/lynx-form-x/issues).

---

## License

MIT

---

Enjoy building forms with **LynxFormX**!  
If you have any questions or feedback, please open an issue or contact the maintainer.

---

_This README is a starting point—feel free to customize and enhance the examples and documentation to better fit your project needs!_
