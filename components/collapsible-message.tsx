import { icone } from '@/lib/config'
import { cn } from '@/lib/utils'
import { ChevronDown, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from './ui/collapsible'
import { Separator } from './ui/separator'

interface CollapsibleMessageProps {
  children: React.ReactNode
  role: 'user' | 'assistant'
  isCollapsible?: boolean
  isOpen?: boolean
  header?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  showBorder?: boolean
}

export function CollapsibleMessage({
  children,
  role,
  isCollapsible = false,
  isOpen = true,
  header,
  onOpenChange,
  showBorder = true
}: CollapsibleMessageProps) {
  const content =       <div className="py-2 flex-1 gap-2 p-2 bg-blue-50 rounded-2xl ">{children}</div>

  return (
    <div className="flex gap-3">
      <div className="relative flex flex-col items-center">
        <div className={cn('mt-[10px]', role === 'assistant' && 'mt-4')}>
          {role === 'user' ? (
            <MessageCircle  size={20} className="text-muted-foreground " />
          ) : (
                       <Image 
              src={icone} 
              alt="Avatar" 
              width={30} 
              height={30} 
              style={{
                backgroundColor: 'white',
                borderRadius: '50%',
                border: '1px solid gray',
                padding: '2px'
              }} 
            />
          )}
        </div>
      </div>

      {isCollapsible ? (
        <div
                                     className={cn(
                                        'flex-1 rounded-2xl p-4 bg-gray-50  text-left',
                                        showBorder && 'border border-border/50 '
                                      )}
        >
          <Collapsible
            open={isOpen}
            onOpenChange={onOpenChange}
            className="w-full m-2"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full group">
              <div className="flex items-center justify-between w-full gap-2 ">
                {header && <div className="text-sm">{header}</div>}
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
              <Separator className="my-4 border-border/50" />
              {content}
            </CollapsibleContent>
          </Collapsible>
        </div>
      ) : (
        content
      )}
    </div>
  )
}
