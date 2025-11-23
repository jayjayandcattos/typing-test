import { useRef, useEffect, useState } from 'react'

export const useKeyboardSounds = () => {
    const keypressSound = useRef(null)
    const spaceSound = useRef(null)
    const enterSound = useRef(null)
    const [volume, setVolume] = useState(10)

    useEffect(() => {   
        keypressSound.current = new Audio('/sounds/keypress.mp3')
        spaceSound.current = new Audio('/sounds/space.mp3')
        enterSound.current = new Audio('/sounds/enter.mp3')

        keypressSound.current.volume = volume / 100
        spaceSound.current.volume = volume / 100
        enterSound.current.volume = volume / 100
    }, [])

    // Update volume when it changes
    useEffect(() => {
        if (keypressSound.current) keypressSound.current.volume = volume / 100
        if (spaceSound.current) spaceSound.current.volume = volume / 100
        if (enterSound.current) enterSound.current.volume = volume / 100
    }, [volume])

    const playSound = (type = 'keypress') => {
        let sound
        switch(type) {
            case 'space':
                sound = spaceSound.current
                break
            case 'enter':
                sound = enterSound.current
                break
            case 'keypress':
            default:
                sound = keypressSound.current
        }
        
        if (sound) {
            sound.currentTime = 0 // Reset to start for rapid keypresses
            sound.play().catch(err => console.log('Error playing sound:', err))
        }
    }

    return { playSound, setVolume }
}


