import { Button } from '@/components/ui/button'
import { question1, question2, question3, question4 } from '@/lib/config'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: `${question1}`,
    message: `${question1}`
  },
  {
    heading: `${question2}`,
    message: `${question2}`
  },
  {
    heading: `${question3}`,
    message: `${question3}`
  },
  {
    heading: `${question4}`,
    message: `${question4}`
  }
]

export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  console.log('Rendering EmptyScreen with messages:', exampleMessages); // Log messages

  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-transparent p-2">
        <p className="text-xs text-center text-gray-600 italic">
          Étant une intelligence artificielle, je peux parfois me tromper, vérifiez mes informations
        </p>
        <div className="mt-4 flex flex-wrap gap-2 mb-4 justify-center">
          {exampleMessages.map((message, index) => (
            <div
              key={index}
              className="shadow-xl p-1 rounded-lg bg-white flex items-center space-x-2 min-w-[150px] max-w-full"
            >
              <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
              <Button
                variant="link"
                className={`h-auto p-0 text-sm italic text-left flex-1 whitespace-normal ${message.heading.length > 50 ? 'text-sm' : 'text-sm'}`}
                name={message.message}
                onClick={async () => {
                  submitMessage(message.message)
                }}
                style={{ minWidth: '150px' }}
              >
                {message.heading}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
