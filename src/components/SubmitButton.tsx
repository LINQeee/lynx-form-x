import {useContext, type FC} from '@lynx-js/react'
import type {ViewProps} from '@lynx-js/types'
import {useEffect} from 'react'
import {formContext} from './Form.jsx'

type SubmitButtonProps = {
  disableOnSubmit?: boolean
  disabledClassName?: string
} & Partial<ViewProps>

export const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  bindtap,
  disableOnSubmit,
  disabledClassName,
  className,
  ...props
}) => {
  const form = useContext(formContext)!

  useEffect(() => {
    console.log(form.isSubmitting)
  }, [form.isSubmitting])
  return (
    <view
      className={
        disableOnSubmit && form.isSubmitting && disabledClassName
          ? `${className} ${disabledClassName}`
          : className
      }
      bindtap={(e) => {
        if (disableOnSubmit && form.isSubmitting) return
        form.handleSubmit()
        bindtap?.(e)
      }}
      {...props}
    >
      {typeof children === 'string' ? <text>{children}</text> : children}
    </view>
  )
}
