import { NoteDB } from '@/server/db'
import type { APIRoute } from 'astro'

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params
  const result = await NoteDB.deleteNote(id!)

  return new Response(JSON.stringify({ message: 'データを削除しました' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const PUT: APIRoute = async ({ params, request }) => {
  const body = await request.json()
  const { message } = body

  if (message.length === 0) {
    return new Response(JSON.stringify({ message: 'データ更新に失敗しました' }), {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const { id } = params
  const result = await NoteDB.updateNote(id!, message)

  return new Response(JSON.stringify({ message: 'データを更新しました' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
