/**
 * File Tweaks are risky: they edit Fortnite's game files on disk.
 *
 * Command asks the user to acknowledge that before any tweak can run. The
 * acknowledgement lives in main-process memory only, so it resets on every
 * app restart, and every file-tweak IPC handler refuses work until it is
 * given. The renderer may remember a "do not show again" choice, but it
 * still has to call `fileTweaksAcknowledge` each session — the main process
 * never trusts a stored preference on its own.
 */

let acknowledged = false

/**
 * Opens the gate, but only when both statements were accepted:
 * the user understands the risks, and will only use tweaks on an alt.
 */
export function fileTweaksAcknowledge(
  understandsRisks: boolean,
  altAccountOnly: boolean
): boolean {
  if (understandsRisks === true && altAccountOnly === true) {
    acknowledged = true
  }

  return acknowledged
}

export function fileTweaksIsUnlocked(): boolean {
  return acknowledged
}
