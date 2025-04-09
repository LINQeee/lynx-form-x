import {useContext, type FC} from '@lynx-js/react'
import type {BaseCommonEvent, Target, ViewProps} from '@lynx-js/types'
import {useEffect} from 'react'
import type {BindInput} from '../hooks/useForm.jsx'
import {formContext} from './Form.jsx'

type FieldProps = {
  name: string
  bindinput?: BindInput
  value?: string
} & Partial<ViewProps>

export const Field: FC<FieldProps> = ({
  children,
  name,
  bindinput,
  bindblur,
  value,
  ...props
}) => {
  const {handleBlur, handleInput, values, setValue} = useContext(formContext)!

  useEffect(() => {
    if (!values[name]) setValue(name, '')
  }, [])

  return (
    <input
      //@ts-ignore
      bindinput={(event: any) => {
        handleInput(name)(event)
        bindinput?.(event)
      }}
      bindblur={(event: BaseCommonEvent<Target>) => {
        handleBlur(name)()
        bindblur?.(event)
      }}
      value={value === undefined ? values[name] : value}
      {...props}
    />
  )
}
