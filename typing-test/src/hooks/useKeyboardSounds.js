import { useRef, useEffect } from 'react'

export const useKeyboardSounds = () => {
    const keypressSound = useRef(null)
    const spaceSound = useRef(null)
    const enterSound = useRef(null)

    useEffect(() => {   
        keypressSound.current = new Audio('/sounds/keypress.mp3')
        spaceSound.current = new Audio('/sounds/space.mp3')
        enterSound.current = new Audio('/sounds/enter.mp3')

        keypressSound.current.volume = 0.1
        spaceSound.current.volume = 0.1
        enterSound.current.volume = 0.1
    }, [])

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
        sound?.play()
    }

if (sound) {
        sound.currentTime = 0 // mag rereset sa simula
        sound.play().catch(err => console.log('Error playing sound:', err))
    } 
}

return { playSound }

