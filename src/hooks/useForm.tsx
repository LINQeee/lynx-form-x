import {useCallback, useReducer} from '@lynx-js/react'
import {ZodObject, ZodTransformer} from 'zod'
import {
  reset,
  setError,
  setIsSubmitting,
  setTouched,
  setValue,
} from '../reducers/formActions.js'
import {
  formReducer,
  type Errors,
  type FormState,
} from '../reducers/formReducer.jsx'

interface InputEvent {
  detail: {
    value: string
  }
}

export type BindInput = (event: InputEvent) => any
export type SetValue<T> = (field: keyof T, value: any) => any
export type SetError<T> = (field: keyof T, error: any) => any

export type ValidateFunc<T> = (values: T) => Errors<T>

export type OnSubmit<T> = (
  values: T,
  helpers: {setValue: SetValue<T>; setError: SetError<T>},
) => any

export const useForm = <T,>(
  onSubmit: OnSubmit<T>,
  initialValues?: T,
  validate?: ValidateFunc<T>,
  schema?: ZodObject<any> | ZodTransformer<any>,
): FormHookValue<T> => {
  const [state, dispatch] = useReducer(formReducer<T>, {
    values: initialValues || {},
    errors: {},
    touched: {},
    isSubmitting: false,
  } as FormState<T>)

  const validateField = useCallback(
    (field: keyof T, value?: any) => {
      if (schema) {
        const result = schema.safeParse(
          value !== undefined
            ? {...state.values, [field]: value}
            : state.values,
        )
        console.log(result.error?.format())
        setFormError(
          field,
          (result.error?.format() as any)[field]?._errors[0] || '',
        )
      } else if (validate) {
        const errors = validate({...state.values, [field]: value})
        setFormError(field, errors[field] || '')
      }
    },
    [validate, schema, setFormError],
  )

  const handleInput = useCallback(
    (field: keyof T) => (e: InputEvent) => {
      const value = e.detail.value
      setFormValue(field, value)
      validateField(field, value)
    },
    [state.values, validateField],
  )

  const handleBlur = useCallback(
    (field: keyof T) => () => {
      setTouched(dispatch, field, true)
      validateField(field)
    },
    [state.values, validateField],
  )

  const handleSubmit = useCallback(() => {
    if (schema) {
      const errors = schema.safeParse(state.values).error?.format()
      if (errors) {
        for (const [field, value] of Object.entries(errors)) {
          const parsedValue = value as any
          if (parsedValue?._errors)
            setFormError(field as keyof T, parsedValue?._errors[0])
        }
        return
      }
    } else if (validate) {
      const errors = validate(state.values)
      if (Object.keys(errors).length > 0) {
        Object.keys(errors).forEach((field) => {
          setFormError(field as keyof T, errors[field as keyof T] || '')
        })
        return
      }
    }

    setIsSubmitting(dispatch, true)
    Promise.resolve(
      onSubmit(state.values, {setValue: setFormValue, setError: setFormError}),
    ).finally(() => setIsSubmitting(dispatch, false))
  }, [validate, schema, state.values, onSubmit, setFormError, setFormValue])

  const resetForm = useCallback(
    () => reset(dispatch, initialValues),
    [initialValues],
  )

  function setFormValue(field: keyof T, value: any) {
    setValue(dispatch, field, value)
  }
  function setFormError(field: keyof T, error: any) {
    setError(dispatch, field, error)
  }

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    handleInput,
    handleBlur,
    handleSubmit,
    resetForm,
    setValue: setFormValue,
    setError: setFormError,
    isSubmitting: state.isSubmitting,
  }
}

export type FormHookValue<T> = FormState<T> & {
  handleInput: (field: keyof T) => BindInput
  handleBlur: (field: keyof T) => () => any
  handleSubmit: () => any
  resetForm: () => any
  setValue: SetValue<T>
  setError: SetError<T>
  isSubmitting: boolean
}
