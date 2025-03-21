
import * as React from "react"

// Constants for breakpoints
export const BREAKPOINTS = {
  MOBILE: 640,  // sm breakpoint
  TABLET: 768,  // md breakpoint
  DESKTOP: 1024 // lg breakpoint
}

/**
 * Hook that detects if the current viewport is mobile-sized
 * @returns {boolean} True if viewport width is less than the mobile breakpoint
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to check if the device is mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.TABLET)
    }

    // Initial check
    checkMobile()

    // Set up event listener for window resize
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.TABLET - 1}px)`)
    const handleResize = () => checkMobile()
    
    // Modern approach using addEventListener
    mql.addEventListener("change", handleResize)
    window.addEventListener("resize", handleResize)
    
    // Cleanup listeners on unmount
    return () => {
      mql.removeEventListener("change", handleResize)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return !!isMobile
}

/**
 * Hook that returns the current breakpoint category
 * @returns {'mobile'|'tablet'|'desktop'} Current breakpoint category
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<'mobile'|'tablet'|'desktop'>('desktop')

  React.useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.MOBILE) {
        setBreakpoint('mobile')
      } else if (width < BREAKPOINTS.DESKTOP) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('desktop')
      }
    }

    // Initial check
    checkBreakpoint()

    // Set up event listener for window resize
    window.addEventListener("resize", checkBreakpoint)
    
    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", checkBreakpoint)
  }, [])

  return breakpoint
}
