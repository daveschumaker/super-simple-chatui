import NiceModal from '@ebay/nice-modal-react'
import { IconMenu2 } from '@tabler/icons-react'
import SystemPrompt from './SystemPrompt'

export default function Header() {
  return (
    <div className="flex flex-row font-bold gap-2 items-center justify-start md:font-[32px]">
      <div
        className="cursor-pointer select-none"
        onClick={() => {
          NiceModal.show('modal', {
            children: <SystemPrompt />
          })
        }}
      >
        <IconMenu2 />
      </div>
      <img src="/chat.png" width="32" />
      Super Simple ChatUI ™
    </div>
  )
}
