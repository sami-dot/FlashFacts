import { useLocation, useNavigate } from 'react-router-dom'

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()

  return (
    <div>
      <h2>Results</h2>
      <p>Your score: {state?.score ?? 0} / {state?.total ?? '?'}</p>
      <button onClick={() => navigate('/')}>Play Again</button>
    </div>
  )
}
