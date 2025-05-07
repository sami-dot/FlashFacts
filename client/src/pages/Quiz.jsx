import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(res => res.json())
      .then(data => {
        console.log('✅ Received data from API:', data)
        setQuestions(data)
      })
      .catch(err => console.error('🧨', err))
  }, [])

  const handleAnswer = (answer) => {
    if (answer === questions[current].correctAnswer) {
      setScore(score + 1)
    }
    const next = current + 1
    if (next < questions.length) {
      setCurrent(next)
    } else {
      navigate('/results', { state: { score, total: questions.length } })
    }
  }

  if (questions.length === 0) return <p>Loading questions...</p>

  const q = questions[current]

  return (
    <div>
      <h2>Question {current + 1}</h2>
      <p>{q.question}</p>
      {q.choices.map((ans, idx) => (
        <button key={idx} onClick={() => handleAnswer(ans)}>
          {ans}
        </button>
      ))}
    </div>
  )
}
