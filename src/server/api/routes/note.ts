import { Hono } from 'hono'
import { NoteDB } from '@/server/db'

const note = new Hono()

note.get('/', async (c) => {
  const notes = await NoteDB.getNotes()
  return c.json(notes, 200)
})

note.post('/', async (c) => {
  const body = await c.req.json()
  const { message } = body

  if (message.length === 0) {
    return c.json({ message: 'データ登録に失敗しました' }, 400)
  }

  const notes = await NoteDB.addNote(message)
  return c.json(notes, 200)
})

note.delete('/:id', async (c) => {
  const id = c.req.param('id')
  await NoteDB.deleteNote(id)
  return c.json({ message: 'データを削除しました' }, 200)
})

note.put('/:id', async (c) => {
  const body = await c.req.json()
  const { message } = body

  if (message.length === 0) {
    return c.json({ message: 'データ更新に失敗しました' }, 400)
  }

  const id = c.req.param('id')
  await NoteDB.updateNote(id, message)
  return c.json({ message: 'データを更新しました' }, 200)
})

export default note
