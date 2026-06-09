import { atom } from 'nanostores'
import { API_BASE, NoteFetch } from '@/fetch'

type Note = {
  id: string
  message: string
}

class NoteStore {
  static notes = atom<Note[]>([])

  static async add(message: string) {
    const response = await NoteFetch.addNote(message)

    NoteStore.init()
  }
  static async update(id: string, message: string) {
    const response = await NoteFetch.updateNote(id, message)

    NoteStore.init()
  }
  static async remove(id: string) {
    const response = await NoteFetch.removeNote(id)

    NoteStore.init()
  }
  static async init() {
    const response = await fetch(`${API_BASE}/note`)
    const data = await response.json()
    NoteStore.notes.set(data)
  }
  static get(id: string): Note | null {
    if (NoteStore.notes) {
      const resultFind = NoteStore.notes.value!.filter((d) => {
        return d.id === id
      })
      if (resultFind[0]) return resultFind[0]
    }
    return null
  }
}
export default NoteStore
