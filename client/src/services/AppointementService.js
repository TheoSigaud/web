import Api from '@/services/Api'

export default {
  createAppointement(params) {
    return Api().post('createAppointement', params)
  },

  fetchAppointements() {
    return Api().get('getAppointements')
  },

  fetchChatAppointements() {
    return Api().get('getChatAppointements')
  },

  updateChatAppointment(params) {
    return Api().post('updateAppointement', params)
  },

  deleteAppointement(params) {
    return Api().post('deleteAppointement', params)
  }
}
