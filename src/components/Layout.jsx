import { Outlet, useLocation } from 'react-router-dom'
import BackgroundMusic from './BackgroundMusic'
import Footer from './Footer'
import Header from './Header'
import RouteTransition from './RouteTransition'
import ScrollProgress from './ScrollProgress'

export default function Layout() {
  const location = useLocation()
  const transparentHeader = location.pathname === '/'

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-bg-main"
      >
        Skip to content
      </a>
      <Header transparentAtTop={transparentHeader} />
      <ScrollProgress />
      <RouteTransition>
        <main id="main-content" className="min-w-0 w-full overflow-x-clip">
          <Outlet />
        </main>
      </RouteTransition>
      <Footer />
      <BackgroundMusic />
    </>
  )
}
