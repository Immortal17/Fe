import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useEffect } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import axios from 'axios'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  animate,
} from 'framer-motion'

const COLOR_PALETTE = ['#FF6B6B', '#4ECDC4', '#45B7D1']

export const AuroraHero = () => {
  // Motion color value for gradient, border, and shadow
  const dynamicColor = useMotionValue(COLOR_PALETTE[0])

  // Animate color transitions smoothly between palette values
  useEffect(() => {
    const controls = animate(dynamicColor, COLOR_PALETTE, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    })

    return () => controls.stop()
  }, [dynamicColor])

  // Motion-based styles
  const backgroundImage = useMotionTemplate`
    radial-gradient(125% 125% at 50% 0%, #020617 50%, ${dynamicColor})
  `
  const borderStyle = useMotionTemplate`1px solid ${dynamicColor}`
  const shadowStyle = useMotionTemplate`0px 4px 24px ${dynamicColor}`

  // Handle API call on button click
  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/api/users/login')
      return data
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
          Now Live!
        </span>

        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl md:text-7xl">
          Decrease your SaaS churn by over 90%
        </h1>

        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg">
          Decrease your SaaS churn by over 90% with our innovative solutions
        </p>

        <motion.button
          onClick={handleLogin}
          style={{ border: borderStyle, boxShadow: shadowStyle }}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
          Start free trial
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  )
}

export default AuroraHero
