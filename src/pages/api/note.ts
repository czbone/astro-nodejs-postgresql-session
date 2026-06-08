import { NoteDB } from '@/server/db'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const notes = await NoteDB.getNotes()

  return new Response(JSON.stringify(notes), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { message } = body

  if (message.length === 0) {
    return new Response(JSON.stringify({ message: 'データ登録に失敗しました' }), {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const notes = await NoteDB.addNote(message)

  return new Response(JSON.stringify(notes), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
