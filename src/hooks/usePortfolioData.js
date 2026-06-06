import { useState, useEffect } from 'react'

export function usePortfolioData() {
  const [data, setData] = useState({
    certifications: [],
    linkedinPosts: [],
    buildLog: [],
    loaded: false
  })

  useEffect(() => {
    Promise.all([
      fetch('/data/certifications.json').then(r => r.json()),
      fetch('/data/linkedin-posts.json').then(r => r.json()),
      fetch('/data/build-log.json').then(r => r.json())
    ])
    .then(([certifications, linkedinPosts, buildLog]) => {
      setData({ certifications, linkedinPosts, buildLog, loaded: true })
    })
    .catch(err => {
      console.warn('Data fetch failed, using fallback:', err)
      setData(prev => ({ ...prev, loaded: true }))
    })
  }, [])

  return data
}
