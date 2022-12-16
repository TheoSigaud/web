import Api from '@/services/Api'

export default {
  register (params) {
    return Api().post('online', params)
  },

  createRoom (params) {
    return Api().post('createRoom', params)
  },

  getRooms (params) {
    return Api().get('/getRooms')
  }
}
