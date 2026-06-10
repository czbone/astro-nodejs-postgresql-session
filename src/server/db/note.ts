import { prisma } from '@/lib/prisma'

interface Note {
  id: string
  message: string
}

class NoteDB {
  async getNotes(): Promise<Note[] | null> {
    try {
      const notes = await prisma.note.findMany({
        orderBy: [
          {
            createdAt: 'asc'
          }
        ]
      })
      return notes
    } catch (err) {
      console.error(err)
      return null
    }
  }
  async addNote(message: string): Promise<Note | null> {
    try {
      const note = await prisma.note.create({
        data: {
          message: message
        }
      })
      return note
    } catch (err) {
      console.error(err)
      return null
    }
  }
  async updateNote(id: string, message: string): Promise<Note | null> {
    try {
      const note = await prisma.note.update({
        where: {
          id: id
        },
        data: {
          message: message
        }
      })
      return note
    } catch (err) {
      console.error(err)
      return null
    }
  }
  async deleteNote(id: string): Promise<Note | null> {
    try {
      const note = await prisma.note.delete({
        where: {
          id: id
        }
      })
      return note
    } catch (err) {
      console.error(err)
      return null
    }
  }
}
export default new NoteDB()
