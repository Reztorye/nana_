import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { IntroScroll } from './components/IntroScroll'
import { Quiz } from './components/Quiz'
import { NanaPage } from './components/NanaPage'
import { useScrollAudio } from './hooks/useScrollAudio'

function HomePage() {
    const [showQuiz, setShowQuiz] = useState(false)
    const navigate = useNavigate()

    useScrollAudio();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic',
        })
    }, [])

    const handleStartQuiz = () => {
        setShowQuiz(true)
    }

    const handleQuizComplete = () => {
        setShowQuiz(false)
        navigate('/nana')
    }

    return (
        <div className="relative min-h-screen">
            <div className="bg-mesh" />

            <IntroScroll onStartQuiz={handleStartQuiz} />

            <AnimatePresence>
                {showQuiz && <Quiz onComplete={handleQuizComplete} />}
            </AnimatePresence>

            <Navbar id="site-content" />
        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nana" element={<NanaPage />} />
        </Routes>
    )
}

export default App
