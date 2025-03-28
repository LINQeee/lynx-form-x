import {useContext, type FC} from '@lynx-js/react'
import type {ViewProps} from '@lynx-js/types'
import {formContext} from './Form.jsx'

type ErrorProps = {
  name: string
} & Partial<ViewProps>

export const Error: FC<ErrorProps> = ({name, children, ...props}) => {
  const errors = useContext(formContext)!.errors
  return errors[name] && <text {...props}>{errors[name]}</text>
}
