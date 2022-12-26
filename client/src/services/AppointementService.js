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

  updateAppointements() {
    return Api().get('updateAppointement')
  },

  deleteAppointement(params) {
    return Api().post('deleteAppointement', params)
  }
}
