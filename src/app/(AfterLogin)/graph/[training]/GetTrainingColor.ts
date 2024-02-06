export default function getTrainingColor(
  training: string | undefined,
  isDarkMode: boolean
) {
  if (isDarkMode) {
    switch (training) {
      case 'press':
        return 'rgba(6, 182, 212, 0.9)';
      case 'bench':
        return 'rgba(255, 99, 132, 0.9)';
      case 'squat':
        return 'rgba(75, 192, 192, 0.9)';
      case 'deadLift':
        return 'rgba(153, 102, 255, 0.9)';
      default:
        return 'rgba(6, 182, 212, 0.9)';
    }
  } else {
    switch (training) {
      case 'press':
        return 'rgba(6, 182, 212, 0.6)';
      case 'bench':
        return 'rgba(255, 99, 132, 0.6)';
      case 'squat':
        return 'rgba(75, 192, 192, 0.6)';
      case 'deadLift':
        return 'rgba(153, 102, 255, 0.6)';
      default:
        return 'rgba(6, 182, 212, 0.6)';
    }
  }
}
