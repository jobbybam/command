import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('file tweaks risk gate', () => {
  beforeEach(() => {
    // The gate keeps its state at module level, so each test needs a fresh copy.
    vi.resetModules()
  })

  it('starts closed', async () => {
    const { fileTweaksIsUnlocked } = await import('./gate')

    expect(fileTweaksIsUnlocked()).toBe(false)
  })

  it('stays closed unless both statements are accepted', async () => {
    const { fileTweaksAcknowledge, fileTweaksIsUnlocked } = await import(
      './gate'
    )

    expect(fileTweaksAcknowledge(true, false)).toBe(false)
    expect(fileTweaksAcknowledge(false, true)).toBe(false)
    expect(fileTweaksAcknowledge(false, false)).toBe(false)
    expect(fileTweaksIsUnlocked()).toBe(false)
  })

  it('opens once both statements are accepted, and stays open', async () => {
    const { fileTweaksAcknowledge, fileTweaksIsUnlocked } = await import(
      './gate'
    )

    expect(fileTweaksAcknowledge(true, true)).toBe(true)
    expect(fileTweaksIsUnlocked()).toBe(true)
    // A later partial request does not close it again within the session.
    expect(fileTweaksAcknowledge(false, false)).toBe(true)
  })

  it('does not treat truthy non-booleans as acceptance', async () => {
    const { fileTweaksAcknowledge } = await import('./gate')

    expect(
      fileTweaksAcknowledge('yes' as unknown as boolean, 1 as unknown as boolean)
    ).toBe(false)
  })
})
