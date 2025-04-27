import { BrowserRouter, Routes, Route } from 'react-router'

import { useState } from 'react'
import { Header } from './components/Header'

import { HomePage } from './pages/home'
import { CountryPage } from './pages/country'

function App() {
  const [isDark, setIsDark] = useState<boolean>(false)

  return (
    <BrowserRouter>
      <Header active={isDark} set={setIsDark} />
      <Routes>
        <Route path="/" element={<HomePage mode={isDark} />} />
        <Route path="/country/:name" element={<CountryPage mode={isDark} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
