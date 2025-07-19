import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-8"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-8"
          >
            <Dialog.Panel className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
              <h3 className="text-xl font-bold text-red-600 mb-4">{title}</h3>
              <p className="text-gray-700 mb-6">{message}</p>
              <div className="flex gap-x-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 rounded-2xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
                >
                  {confirmText}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 