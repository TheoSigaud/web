import Api from '@/services/Api'

export default {
  createRoom (params) {
    return Api().post('createRoom', params)
  },

  getRooms (params) {
    return Api().post('getRooms', params)
  },

  deleteRoom (params) {
    return Api().post('deleteRoom', params)
  },

  updateRoom (params) {
    return Api().post('updateRoom', params)
  }
}
