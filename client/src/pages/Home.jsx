import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  const startQuiz = () => {
    navigate('/quiz')
  }

  return (
    <div>
      <h2>Welcome to FlashFacts</h2>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  )
}
