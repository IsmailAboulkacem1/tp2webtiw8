// src/store/hooks.ts  fournit useAppSelector et useAppDispatch typés.
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// Hook tipé pour dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Hook tipé pour selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector