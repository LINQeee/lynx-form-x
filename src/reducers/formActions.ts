import type {Dispatch} from '@lynx-js/react'
import {ActionType, type Action} from './formReducer.jsx'

export const setIsSubmitting = <T>(
  dispatch: Dispatch<Action<T>>,
  isSubmitting: boolean,
) => dispatch({type: ActionType.SET_IS_SUBMITTING, isSubmitting})

export const setValue = <T>(
  dispatch: Dispatch<Action<T>>,
  field: keyof T,
  value: any,
) => dispatch({type: ActionType.SET_VALUE, field, value})

export const setError = <T>(
  dispatch: Dispatch<Action<T>>,
  field: keyof T,
  error: any,
) => dispatch({type: ActionType.SET_ERROR, field, error})

export const setTouched = <T>(
  dispatch: Dispatch<Action<T>>,
  field: keyof T,
  touched: boolean,
) => dispatch({type: ActionType.SET_TOUCHED, field, touched})

export const reset = <T>(dispatch: Dispatch<Action<T>>, initialValues: any) =>
  dispatch({type: ActionType.RESET, initialValues})
