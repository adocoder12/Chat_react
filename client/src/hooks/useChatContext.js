import { ChatContext } from '../context/WorkoutContext'
import { useContext } from 'react'

export const useChatContext = () => {
  const context = useContext(ChatContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}