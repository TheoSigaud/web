import Api from '@/services/Api'

export default {
  createAppointement (params) {
    return Api().post('createAppointement', params)
  },

  deleteAppointement (params) {
    return Api().post('deleteAppointement', params)
  }
}
