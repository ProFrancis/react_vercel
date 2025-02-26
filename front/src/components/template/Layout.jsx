import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main>
      <Header />
        <section>
          <Outlet />
        </section>
      <Footer/>
    </main>
  )
}

export default Layout