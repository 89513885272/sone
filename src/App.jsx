import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

// Твои правильные импорты фотографий:
import myPhoto1 from './images/photo1.jpg'
import myPhoto2 from './images/photo3.jpg'
import myPhoto3 from './images/photo2.jpg'

function App() {
  const [hearts, setHearts] = useState([])
  const [activeTab, setActiveTab] = useState('main')
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [kissEffect, setKissEffect] = useState(false)

  // Фоновые летающие сердечки
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now()
      const left = Math.random() * 100
      const size = Math.random() * 20 + 10
      const duration = Math.random() * 4 + 4

      setHearts((prev) => [...prev.slice(-15), { id, left, size, duration }])
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Салют при клике на фото
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo)
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff']
    })
  }

  // Кнопка «Отправить лучи любви» внутри модального окна
  const handleSendLove = (e) => {
    e.stopPropagation()
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
      shapes: ['star', 'circle'],
      colors: ['#ff0054', '#ff5400', '#ffbd00']
    })
  }

  const handleMainButton = () => {
    setKissEffect(true)
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.5 }
    })
    setTimeout(() => setKissEffect(false), 3000)
  }

  const handleNoClick = () => setNoCount(prev => prev + 1)

  const getNoButtonText = () => {
    const phrases = [
      "Нет",
      "Ты уверена? 🥺",
      "Подумай еще раз!",
      "Ну пожалуйста...",
      "Кнопка 'Да' вон та! 💕",
      "Я буду сильно плакать 😭"
    ]
    return phrases[Math.min(noCount, phrases.length - 1)]
  }

  // Массив твоих локальных фото
  const photos = [
    { id: 1, url: myPhoto1, caption: 'Самая красивая на свете ❤️' },
    { id: 2, url: myPhoto2, caption: 'Твоя улыбка завораживает ✨' },
    { id: 3, url: myPhoto3, caption: 'Мое любимое солнышко 🌸' },
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-slate-900 via-rose-950 to-purple-950 text-white flex flex-col items-center justify-between p-4 sm:p-8 overflow-x-hidden font-sans">
      
      {/* Летающие сердечки */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="floating-heart text-rose-400/30"
            style={{
              position: 'absolute',
              left: `${h.left}%`,
              bottom: '-40px',
              fontSize: `${h.size}px`,
              animation: `float ${h.duration}s linear infinite`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Взрыв поцелуев */}
      {kissEffect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="text-center animate-bounce">
            <div className="text-6xl sm:text-8xl mb-4">💋 Mwah! 💋</div>
            <div className="text-2xl sm:text-4xl font-bold text-pink-300 font-serif drop-shadow-lg">
              Люблю тебя буся! ✨❤️
            </div>
          </div>
        </div>
      )}

      {/* Верхнее меню */}
      <header className="relative z-10 w-full max-w-4xl flex justify-center gap-2 sm:gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('main')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md ${activeTab === 'main' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50' : 'bg-white/10 hover:bg-white/20 text-rose-200'}`}
        >
          Главная ✨
        </button>
        <button 
          onClick={() => setActiveTab('reasons')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md ${activeTab === 'reasons' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50' : 'bg-white/10 hover:bg-white/20 text-rose-200'}`}
        >
          Почему ты? 💖
        </button>
        <button 
          onClick={() => setActiveTab('photos')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md ${activeTab === 'photos' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50' : 'bg-white/10 hover:bg-white/20 text-rose-200'}`}
        >
          Наши фото 📸
        </button>
        <button 
          onClick={() => setActiveTab('question')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md ${activeTab === 'question' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50' : 'bg-white/10 hover:bg-white/20 text-rose-200'}`}
        >
          Вопрос 💌
        </button>
      </header>

      {/* Основной контент */}
      <main className="relative z-10 w-full max-w-3xl my-auto">
        
        {/* Главная */}
        {activeTab === 'main' && (
          <div className="text-center bg-white/10 backdrop-blur-xl border border-white/20 p-8 sm:p-12 rounded-3xl shadow-2xl animate-fade-in">
            <div className="text-6xl sm:text-7xl mb-6 animate-bounce">💖</div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-4 font-serif">
              Для самой особенной
            </h1>
            <p className="text-rose-200/80 text-base sm:text-lg max-w-lg mx-auto mb-8">
              Нажми на кнопку ниже, чтобы отправить заряд нежности и поцелуев! ✨
            </p>
            <button 
              onClick={handleMainButton}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-rose-500/40 transition-all transform hover:scale-105 active:scale-95"
            >
              Получить поцелуйчик 💋
            </button>
          </div>
        )}

        {/* Причины */}
        {activeTab === 'reasons' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-6 rounded-2xl hover:bg-white/15 transition transform hover:-translate-y-1">
              <span className="text-2xl mb-2 block">✨</span>
              <h3 className="font-semibold text-lg text-rose-200 mb-1">Твоя улыбка</h3>
              <p className="text-gray-300 text-sm">Она способна осветить даже самый хмурый и тяжелый день.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-6 rounded-2xl hover:bg-white/15 transition transform hover:-translate-y-1">
              <span className="text-2xl mb-2 block">🌸</span>
              <h3 className="font-semibold text-lg text-rose-200 mb-1">Невероятная забота</h3>
              <p className="text-gray-300 text-sm">Рядом с тобой я чувствую себя по-настоящему дома и в безопасности.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-6 rounded-2xl hover:bg-white/15 transition transform hover:-translate-y-1">
              <span className="text-2xl mb-2 block">💫</span>
              <h3 className="font-semibold text-lg text-rose-200 mb-1">Наши моменты</h3>
              <p className="text-gray-300 text-sm">Даже обычный разговор с тобой превращается в нечто особенное.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-6 rounded-2xl hover:bg-white/15 transition transform hover:-translate-y-1">
              <span className="text-2xl mb-2 block">🔥</span>
              <h3 className="font-semibold text-lg text-rose-200 mb-1">Твоя энергия</h3>
              <p className="text-gray-300 text-sm">Ты вдохновляешь меня развиваться и делать классные вещи.</p>
            </div>
          </div>
        )}

        {/* Фотографии */}
        {activeTab === 'photos' && (
          <div className="animate-fade-in text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-200 mb-6 font-serif">
              Красотулечка моя 📸 (нажми на фото)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div 
                  key={photo.id}
                  onClick={() => handlePhotoClick(photo)}
                  className="cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl overflow-hidden group transition duration-300 transform hover:-translate-y-2 hover:scale-105 hover:border-rose-400 hover:shadow-2xl hover:shadow-rose-500/30"
                >
                  <img 
                    src={photo.url} 
                    alt="Love" 
                    className="w-full h-48 object-cover rounded-xl mb-3 group-hover:scale-105 transition duration-300" 
                  />
                  <p className="text-sm text-rose-200 font-medium">{photo.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Вопрос */}
        {activeTab === 'question' && (
          <div className="text-center bg-white/10 backdrop-blur-xl border border-white/20 p-8 sm:p-12 rounded-3xl shadow-2xl animate-fade-in">
            <div className="text-5xl mb-6">💌</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-200 mb-6 font-serif">
              Ты же знаешь, как сильно я тебя люблю? 🥰
            </h2>

            {yesPressed ? (
              <div className="p-6 bg-rose-500/20 border border-rose-500/40 rounded-2xl animate-fade-in text-rose-200 font-semibold text-lg">
                Урааа! ❤️ Я люблю тебя бесконечно сильно! Самая лучшая! ✨
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4 items-center">
                <button 
                  onClick={() => {
                    setYesPressed(true)
                    confetti({ particleCount: 120, spread: 100 })
                  }}
                  style={{ transform: `scale(${1 + noCount * 0.15})` }}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
                >
                  Да, безумно! ❤️
                </button>
                
                <button 
                  onClick={handleNoClick}
                  className="bg-white/10 hover:bg-white/20 text-gray-300 font-medium py-3 px-6 rounded-full transition-all border border-white/10 text-sm"
                >
                  {getNoButtonText()}
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Модальное окно с красивой плавной анимацией scale-up */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white/10 border border-white/20 p-5 rounded-3xl max-w-md w-full text-center backdrop-blur-2xl shadow-2xl relative animate-scale-up"
          >
            <div className="relative overflow-hidden rounded-2xl mb-4 group">
              <img 
                src={selectedPhoto.url} 
                alt="Zoomed" 
                className="w-full h-80 object-cover rounded-2xl shadow-lg" 
              />
            </div>

            <p className="text-xl text-rose-200 font-semibold mb-4 font-serif">{selectedPhoto.caption}</p>

            <div className="flex justify-center gap-3">
              <button 
                onClick={handleSendLove}
                className="bg-rose-500/80 hover:bg-rose-500 text-white text-sm font-semibold py-2 px-5 rounded-full shadow-md transition transform hover:scale-105 active:scale-95 flex items-center gap-1 mx-auto"
              >
                <span>Отправить лучи любви</span> ✨
              </button>
            </div>

            <button 
              onClick={() => setSelectedPhoto(null)}
              className="mt-4 text-xs text-rose-200/60 hover:text-rose-200 underline block mx-auto"
            >
              Закрыть окно
            </button>
          </div>
        </div>
      )}

      {/* Подвал */}
      <footer className="relative z-10 mt-6 text-xs text-rose-300/60 tracking-wider">
        Создано с любовью ❤️ специально для тебя
      </footer>

    </div>
  )
}

export default App