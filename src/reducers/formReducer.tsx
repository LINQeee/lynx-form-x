export enum ActionType {
  SET_VALUE,
  SET_ERROR,
  SET_TOUCHED,
  SET_IS_SUBMITTING,
  RESET,
}

export type Errors<T> = Partial<Record<keyof T, string>>

export type FormState<T> = {
  values: T
  errors: Partial<Errors<T>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
}

export type Action<T> =
  | {type: ActionType.SET_VALUE; field: keyof T; value: any}
  | {type: ActionType.SET_ERROR; field: keyof T; error: string}
  | {type: ActionType.SET_TOUCHED; field: keyof T; touched: boolean}
  | {type: ActionType.RESET; initialValues: T}
  | {type: ActionType.SET_IS_SUBMITTING; isSubmitting: boolean}

export function formReducer<T>(
  state: FormState<T>,
  action: Action<T>,
): FormState<T> {
  switch (action.type) {
    case ActionType.SET_VALUE:
      return {
        ...state,
        values: {...state.values, [action.field]: action.value},
      }
    case ActionType.SET_ERROR:
      return {
        ...state,
        errors: {...state.errors, [action.field]: action.error},
      }
    case ActionType.SET_TOUCHED:
      return {
        ...state,
        touched: {...state.touched, [action.field]: action.touched},
      }
    case ActionType.SET_IS_SUBMITTING:
      return {...state, isSubmitting: action.isSubmitting}
    case ActionType.RESET:
      return {
        values: action.initialValues,
        errors: {},
        touched: {},
        isSubmitting: false,
      }
    default:
      return state
  }
}
