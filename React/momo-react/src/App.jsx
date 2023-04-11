import { useState, useRef } from 'react';

export default function Stopwatch() {

  const [start, setStart] = useState(null)
  const [now, setNow] = useState(null)
  const intervalRef = useRef(null)

  const startClick = () => {
    setStart(Date.now())
    setNow(Date.now())
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setNow(Date.now), 10
    )
  }

  const handleStop = () => {
    clearInterval(intervalRef.current)
  }

 
  let secondsPassed = 0;
 
    secondsPassed = (now - start) / 1000;


  return (
    <div>
      <h1>{secondsPassed}</h1>
      <button onClick={startClick}>start</button>
      <button  onClick={handleStop}>stop</button>
    </div>
  )
}
