export function formatDateRange(dateString: string): string {
  // Parse date range format like "2024-02 to 2024-09" or "2021-03 to 2024-02"
  const [startDate, endDate] = dateString.split(' to ')

  const formatMonthYear = (date: string) => {
    const [year, month] = date.split('-')
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }

  return `${formatMonthYear(startDate)} - ${formatMonthYear(endDate)}`
}
