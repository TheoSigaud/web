import Api from '@/services/Api'

export default {
  createAppointement(params) {
    return Api().post('createAppointement', params)
  },

  fetchAppointements(params) {
    return Api().post('getAppointements', params)
  },

  fetchChatAppointements(params) {
    return Api().post('getChatAppointements', params)
  },

  updateChatAppointment(params) {
    return Api().post('updateAppointement', params)
  },

  deleteAppointement(params) {
    return Api().post('deleteAppointement', params)
  }
}
