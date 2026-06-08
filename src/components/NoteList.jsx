import { useState, useEffect, useRef } from 'react'
import { useStore } from '@nanostores/react'
import { Modal } from 'flowbite'
import { NoteStore } from '../stores'

export default function NoteList() {
  const $notes = useStore(NoteStore.notes)
  const [newNote, setNewNote] = useState('')
  const [modalNote, setModalNote] = useState('')
  const [editId, setEditId] = useState(null)
  const modalRef = useRef(null)
  const modalInstanceRef = useRef(null)

  // 初期データロード
  useEffect(() => {
    NoteStore.init()
  }, [])

  // モーダルの初期化
  useEffect(() => {
    if (modalRef.current && !modalInstanceRef.current) {
      const options = {
        backdrop: 'static'
      }
      modalInstanceRef.current = new Modal(modalRef.current, options)
    }
  }, [])

  const handleEditNote = (id) => {
    const noteRecord = NoteStore.get(id)
    if (noteRecord) {
      setModalNote(noteRecord.message)
      setEditId(id)
      if (modalInstanceRef.current) {
        modalInstanceRef.current.show()
      }
    }
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      NoteStore.add(newNote)
      setNewNote('')
    }
  }

  const handleUpdateNote = () => {
    if (modalNote.trim() && editId) {
      NoteStore.update(editId, modalNote)
    }
    if (modalInstanceRef.current) {
      modalInstanceRef.current.hide()
    }
  }

  const handleRemoveNote = (id) => {
    NoteStore.remove(id)
  }

  const handleCloseModal = () => {
    if (modalInstanceRef.current) {
      modalInstanceRef.current.hide()
    }
  }

  const handleKeyEnter = (e, callback) => {
    if (e.key === 'Enter') {
      callback()
    }
  }

  return (
    <div>
      <h2 className="text-3xl my-4">メモリスト</h2>
      <ul>
        {$notes.map((note, index) => (
          <li
            key={index}
            className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-300 my-3 h-16"
          >
            <span>{note.message}</span>
            <div>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full p-1 text-center inline-flex items-center mr-3"
                onClick={() => handleEditNote(note.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="#fff"
                >
                  <title>pencil</title>
                  <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
              </button>
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-full p-1 text-center inline-flex items-center"
                onClick={() => handleRemoveNote(note.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="#fff"
                >
                  <title>trash-can-outline</title>
                  <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-10">
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyPress={(e) => handleKeyEnter(e, handleAddNote)}
          type="text"
          className="rounded-lg w-5/6 border border-gray-400 p-2"
          placeholder="メモを入力"
        />
        <button
          className="ml-2 w-1/6 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm font-medium rounded-lg text-center"
          onClick={handleAddNote}
        >
          追加
        </button>
      </div>

      {/* Main modal */}
      <div
        ref={modalRef}
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
      >
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">メモを更新</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={handleCloseModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 space-y-6">
              <input
                value={modalNote}
                onChange={(e) => setModalNote(e.target.value)}
                onKeyPress={(e) => handleKeyEnter(e, handleUpdateNote)}
                type="text"
                className="rounded-lg w-full border border-gray-400 p-2"
                placeholder="メモを入力"
              />
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleUpdateNote}
              >
                更新する
              </button>
              <button
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                onClick={handleCloseModal}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
