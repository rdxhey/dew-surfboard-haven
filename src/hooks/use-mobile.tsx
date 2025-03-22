
import * as React from "react"

// Constants for breakpoints - aligned with Tailwind defaults
export const BREAKPOINTS = {
  XS: 400,    // xs breakpoint (custom)
  MOBILE: 640,  // sm breakpoint
  TABLET: 768,  // md breakpoint
  DESKTOP: 1024, // lg breakpoint
  LARGE: 1280   // xl breakpoint
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
 * Hook that returns the current viewport size category
 * @returns {'xs'|'mobile'|'tablet'|'desktop'|'large'} Current breakpoint category
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<'xs'|'mobile'|'tablet'|'desktop'|'large'>('desktop')

  React.useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.XS) {
        setBreakpoint('xs')
      } else if (width < BREAKPOINTS.MOBILE) {
        setBreakpoint('mobile')
      } else if (width < BREAKPOINTS.DESKTOP) {
        setBreakpoint('tablet')
      } else if (width < BREAKPOINTS.LARGE) {
        setBreakpoint('desktop')
      } else {
        setBreakpoint('large')
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

/**
 * Hook that provides responsive design values based on current breakpoint
 * @returns Responsive values for spacing, font sizes, etc.
 */
export function useResponsiveValues() {
  const breakpoint = useBreakpoint()
  
  const spacing = React.useMemo(() => ({
    container: breakpoint === 'xs' ? 'px-2' : 
               breakpoint === 'mobile' ? 'px-3' : 
               breakpoint === 'tablet' ? 'px-4' : 'px-6',
    section: breakpoint === 'xs' ? 'py-3' : 
             breakpoint === 'mobile' ? 'py-4' : 'py-6',
    gap: breakpoint === 'xs' ? 'gap-2' : 
         breakpoint === 'mobile' ? 'gap-3' : 'gap-4'
  }), [breakpoint])
  
  const text = React.useMemo(() => ({
    title: breakpoint === 'xs' ? 'text-lg' : 
           breakpoint === 'mobile' ? 'text-xl' : 
           breakpoint === 'tablet' ? 'text-2xl' : 'text-3xl',
    subtitle: breakpoint === 'xs' ? 'text-base' : 
              breakpoint === 'mobile' ? 'text-lg' : 'text-xl'
  }), [breakpoint])
  
  return { spacing, text, breakpoint }
}
