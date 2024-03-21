import { useEffect } from 'react'
import { useLocalState } from '@/hooks'

export function useIsMobile(): boolean {
  const { localState, setLocalState } = useLocalState<{ isMobile: boolean }>({ isMobile: true }, 'jmsx__device__isMobile')

  const handleResize = () => {
    setLocalState({ isMobile: window.innerWidth <= 600 ? true : false })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  return typeof window !== 'undefined' ? localState.isMobile : false
}
