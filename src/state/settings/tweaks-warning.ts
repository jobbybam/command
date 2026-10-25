import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TweaksWarningState = {
  /**
   * The user ticked "do not show again" after accepting both statements.
   * The main process still needs an acknowledgement every session; this only
   * lets the page give it on the user's behalf instead of asking again.
   */
  skipWarning: boolean

  setSkipWarning: (value: boolean) => void
}

export const useTweaksWarningStore = create<TweaksWarningState>()(
  persist(
    (set) => ({
      skipWarning: false,
      setSkipWarning: (value) => set({ skipWarning: value }),
    }),
    {
      name: 'command-tweaks-warning',
      partialize: ({ skipWarning }) => ({ skipWarning }),
    }
  )
)
