import { API_BASE } from '@/fetch'

class NoteFetch {
  async addNote(message: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message
        })
      })
      return response
    } catch (e) {
      return null
    }
  }

  async removeNote(id: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/note/${id}`, {
        method: 'DELETE'
      })
      return response
    } catch (e) {
      return null
    }
  }

  async updateNote(id: string, message: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/note/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message
        })
      })
      return response
    } catch (e) {
      return null
    }
  }
}
export default new NoteFetch()
