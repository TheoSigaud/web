import Api from '@/services/Api'

export default {
  createAppointement(params) {
    return Api().post('createAppointement', params)
  },

  fetchAppointements() {
    return Api().get('getAppointements')
  },

  deleteAppointement(params) {
    return Api().post('deleteAppointement', params)
  }
}
