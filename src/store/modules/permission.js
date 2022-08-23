import router, { constantRoutes, asyncRoutes } from '@/router'

export default {
  namespaced: true,
  state: { routes: [], points: [] },
  mutations: {
    setRoutes(state, payload) {
      state.routes = [...constantRoutes, ...payload]
    },
    setPoints(state, payload) {
      state.points = payload
    }
  },
  actions: {
    filterRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRoutes', routes)
      context.commit('setPoints', roles.points)
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    }
  }
}
