export function throwError(where: string, message: string): void {
  const date = Intl.DateTimeFormat('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(Date.now())
  throw new Error(`${date} [${where}]: ${message}`)
}
