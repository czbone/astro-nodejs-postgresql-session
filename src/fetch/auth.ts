import { API_BASE } from '@/fetch'

class AuthFetch {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      return response
    } catch (e) {
      return null
    }
  }
  async logout(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST'
      })
      return response
    } catch (e) {
      return null
    }
  }
}
export default new AuthFetch()
