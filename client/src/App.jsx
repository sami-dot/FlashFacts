import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>FlashFacts ⚡</h1>
      <Outlet />
    </div>
  )
}
