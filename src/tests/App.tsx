import React from 'react'
import {z} from 'zod'
import {Error} from '../components/Error.jsx'
import {Field} from '../components/Field.jsx'
import {Form} from '../components/Form.jsx'
import {SubmitButton} from '../components/SubmitButton.jsx'
import './App.css'

export function App() {
  return (
    <Form
      schema={z.object({
        login: z.string().nonempty('Enter login'),
        password: z.string().nonempty('Enter password'),
      })}
      onSubmit={async (values) => {
        console.log('submit')
        await new Promise((resolve) => setTimeout(resolve, 10000))
      }}
      className='App'
    >
      <Field name='login' />
      <Error name='login' />
      <Field name='password' />
      <Error name='password' />
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
