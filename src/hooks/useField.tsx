import {useContext} from '@lynx-js/react'
import {formContext} from '../components/Form.jsx'

export const useField = (name: string) => {
  const {values, errors, touched, setValue, setError} = useContext(formContext)!
  return {
    value: values[name],
    error: errors[name],
    touched: touched[name],
    setValue: (value: any) => setValue(name, value),
    setError: (error: any) => setError(name, error),
  }
}
