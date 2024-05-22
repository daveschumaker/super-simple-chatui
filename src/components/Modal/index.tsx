import NiceModal from '@ebay/nice-modal-react'
import { Modal as ResponsiveModal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import styles from './modal.module.css'
import { IconX } from '@tabler/icons-react'

const Modal = NiceModal.create(
  ({
    children
    // onCloseModal = () => {}
  }: {
    children: React.ReactNode
    // onCloseModal?: () => void
  }) => {
    return (
      <ResponsiveModal
        classNames={{
          modal: styles.modal
        }}
        closeIcon={
          <div
            className="text-black dark:text-white hover:primary-color"
            onClick={() => {
              NiceModal.remove('modal')
            }}
          >
            <IconX />
          </div>
        }
        open={true}
        center
        onClose={() => {
          NiceModal.remove('modal')
        }}
        styles={{
          root: {
            margin: '0 16px'
          }
        }}
      >
        <div className={styles['modal-content']}>{children}</div>
      </ResponsiveModal>
    )
  }
)

export default Modal
