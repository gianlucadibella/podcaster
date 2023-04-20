export const formatDuration = (trackTimeMillis: number) => {
  // Convert duration to seconds
  const totalSeconds = Math.floor(trackTimeMillis / 1000)

  // Calculate the number of hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  // Format the duration as hours:minutes:seconds
  return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
}
