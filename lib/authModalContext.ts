'use client'

import { createContext, useContext } from 'react'

interface AuthModalCtx { open: boolean; setOpen: (v: boolean) => void }

export const AuthModalContext = createContext<AuthModalCtx>({ open: false, setOpen: () => {} })
export const useAuthModal = () => useContext(AuthModalContext)
