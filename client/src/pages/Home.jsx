/*import { useNavigate } from 'react-router-dom'

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
*/
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to FlashFacts</h2>
      <button onClick={() => navigate('/quiz')}>Start Quiz</button>
    </div>
  );
}
