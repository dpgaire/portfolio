import React, { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

const InstallApp = () => {
  const [showButton, setShowButton] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installClicked, setInstallClicked] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowButton(true)

      // Auto-hide after 10 seconds
      const timeout = setTimeout(() => {
        setShowButton(false)
      }, 10000)

      return () => clearTimeout(timeout)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the PWA install')
    } else {
      console.log('User dismissed the PWA install')
    }

    setInstallClicked(true)
    setDeferredPrompt(null)
    setShowButton(false)
  }

  if (!showButton || installClicked) return null

  return (
    <button
      onClick={handleInstallClick}
      className="fixed top-3 left-28 btn-primary flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 z-50"
    >
      <Download size={20} className="animate-bounce" />
      Install App
    </button>
  )
}

export default InstallApp
