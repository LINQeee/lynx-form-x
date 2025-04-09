import {useContext, type FC} from '@lynx-js/react'
import type {BaseCommonEvent, Target, ViewProps} from '@lynx-js/types'
import {useEffect} from 'react'
import type {BindInput} from '../hooks/useForm.jsx'
import {formContext} from './Form.jsx'

type FieldProps = {
  name: string
  bindinput?: BindInput
} & Partial<ViewProps>

export const Field: FC<FieldProps> = ({
  children,
  name,
  bindinput,
  bindblur,
  ...props
}) => {
  const {handleBlur, handleInput, values, setValue} = useContext(formContext)!

  useEffect(() => {
    if (!values[name]) setValue(name, '')
  }, [])

  return (
    <input
      //@ts-ignore
      bindinput={(event) => {
        handleInput(name)(event)
        bindinput?.(event)
      }}
      bindblur={(event: BaseCommonEvent<Target>) => {
        handleBlur(name)()
        bindblur?.(event)
      }}
      {...props}
    />
  )
}
