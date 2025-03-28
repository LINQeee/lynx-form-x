import {createContext} from '@lynx-js/react'
import type {ViewProps} from '@lynx-js/types'
import {ZodObject, ZodTransformer} from 'zod'
import {
  useForm,
  type FormHookValue,
  type OnSubmit,
  type ValidateFunc,
} from '../hooks/useForm.jsx'

type FormProps<T> = {
  initialValues?: T
  onSubmit: OnSubmit<T>
  validate?: ValidateFunc<T>
  schema?: ZodObject<any> | ZodTransformer<any>
} & Partial<ViewProps>

export const formContext = createContext<FormHookValue<any> | undefined>(
  undefined,
)

export function Form<T>({
  initialValues,
  onSubmit,
  validate,
  schema,
  children,
  ...props
}: FormProps<T>) {
  const form = useForm<T>(onSubmit, initialValues, validate, schema)

  return (
    <formContext.Provider value={form as FormHookValue<any>}>
      <view {...props}>{children}</view>
    </formContext.Provider>
  )
}
