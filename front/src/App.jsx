import { Routes, Route } from 'react-router-dom'

// CSS 
import './App.css'

// COMPONENTS
import Layout from './components/template/Layout'

// PAGES
import Home from './pages/Home'
import AddArticle from './pages/AddArticle'
import Detail from './pages/Detail'
import Update from './pages/Update'

function App() {

  return (
   <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home />} />
      <Route path='/add' element={<AddArticle />} />
      <Route path='/detail/article/:id' element={<Detail />} />
      <Route path='/update/article/:id' element={<Update />} />
    </Route>
   </Routes>
  )
}

export default App
