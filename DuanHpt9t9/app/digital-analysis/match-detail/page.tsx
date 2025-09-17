// Auto-update time when playing
useEffect(() => {
  let interval: NodeJS.Timeout
  if (isPlaying && currentTime < duration) {
    interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + playbackSpeed
        return newTime >= duration ? duration : newTime
      })
    }, 1000)
  }
  return () => clearInterval(interval)
}, [isPlaying, currentTime, duration, playbackSpeed])

// Auto-pause when reaching the end
useEffect(() => {
  if (currentTime >= duration) {
    setIsPlaying(false)
  }
}, [currentTime, duration])
