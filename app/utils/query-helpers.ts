export const subtractDays = (days: number, ref: Date = new Date()): Date => {
  const newDate = new Date()
  newDate.setDate(ref.getDate() - days)
  newDate.setUTCHours(0)
  newDate.setUTCMinutes(0)
  newDate.setUTCSeconds(0)
  return newDate
}
