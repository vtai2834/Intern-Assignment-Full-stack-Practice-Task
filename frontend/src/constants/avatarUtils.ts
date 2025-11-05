// Generate initials from name
export const getInitials = (name: string): string => {
  const parts = name.split(" ")
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

// Generate a color based on name
export const getAvatarColor = (name: string): string => {
  const colors = [
    "#1F8CEB", // Blue
    "#76B900", // Green
    "#4A154B", // Purple
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Violet
    "#06B6D4", // Cyan
    "#EC4899", // Pink
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}
