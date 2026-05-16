import Vue from 'vue'
import Vuex from 'vuex'
import storage from "@/utils/storage"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null,
    office_id: null,
    name: null,
    lastName: null,
    affiliated: null,
    activated: null,
    _activated: null,
    plan: null,
    country: null,
    photo: null,
    tree: null,
    email: null,
    token: null,
    dni: null,
    address: null,
    city: null,
    birthdate: null,
    total_points: null,
    cartItems: [],
    affiliationTotal: null,
    affiliationPoints: null,
    affiliationPlan: null,
    isAffiliationCheckout: false,

    fb: '',
    is: '',
    tk: '',
    yt: '',
    wsp_pe: 'https://api.whatsapp.com/send?phone=51977206522&text=Hola',
    wsp_bo: 'https://api.whatsapp.com/send?phone=51977206522&text=Hola',
    wsp_ec: 'https://api.whatsapp.com/send?phone=51977206522&text=Hola',
    site: '',

    open: false,
    resume: false,
    buys: false,
    network: false,
    commissions: false,
    education: false,
  },
  mutations: {
    SET_SESSION: (state, session) => {
      state.session = session
      if (session) {
        storage.set('session', session)
      } else {
        storage.remove('session')
      }
    },
    SET_OFFICE_ID: (state, { office_id, path }) => {
      state.office_id = office_id
      if (office_id) {
        storage.set('office', 'true')
        storage.set('office_id', office_id)
        storage.set('path', path)
      } else {
        storage.remove('office')
        storage.remove('office_id')
        storage.remove('path')
      }
    },
    SET_NAME: (state, name) => {
      state.name = name
      if (name) {
        storage.set('name', name)
      } else {
        storage.remove('name')
      }
    },
    SET_LAST_NAME: (state, lastName) => {
      state.lastName = lastName
      if (lastName) {
        storage.set('lastName', lastName)
      } else {
        storage.remove('lastName')
      }
    },
    SET_AFFILIATED: (state, affiliated) => {
      let val = affiliated === 'true' || affiliated === true;
      state.affiliated = val;
      storage.set('affiliated', val.toString());
    },
    SET_ACTIVATED: (state, activated) => {
      state.activated = activated
      storage.set('activated', activated.toString())
    },
    SET__ACTIVATED: (state, _activated) => {
      state._activated = _activated
      storage.set('_activated', _activated.toString())
    },
    SET_PLAN: (state, plan) => {
      state.plan = plan
      storage.set('plan', plan)
    },
    SET_COUNTRY: (state, country) => {
      state.country = country
      storage.set('country', country)
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo
      storage.set('photo', photo)
    },
    SET_TREE: (state, tree) => {
      state.tree = tree
      storage.set('tree', tree.toString())
    },
    SET_EMAIL: (state, email) => {
      state.email = email
      storage.set('email', email)
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      storage.set('token', token)
    },
    SET_DNI: (state, dni) => {
      state.dni = dni
      storage.set('dni', dni)
    },
    SET_ADDRESS: (state, address) => {
      state.address = address
      storage.set('address', address)
    },
    SET_CITY: (state, city) => {
      state.city = city
      storage.set('city', city)
    },
    SET_BIRTHDATE: (state, birthdate) => {
      state.birthdate = birthdate
      storage.set('birthdate', birthdate)
    },
    SET_TOTAL_POINTS: (state, total_points) => {
      state.total_points = total_points
      storage.set('total_points', total_points.toString())
    },
    SET_BALANCE: (state, balance) => {
      state.balance = balance
      storage.set('balance', balance.toString())
    },
    SET__BALANCE: (state, _balance) => {
      state._balance = _balance
      storage.set('_balance', _balance.toString())
    },
    setCartItems: (state, cartItems) => {
      state.cartItems = Array.isArray(cartItems) ? cartItems : [];
    },
    setAffiliationCheckout: (state, { total, points, plan }) => {
      state.affiliationTotal = total
      state.affiliationPoints = points
      state.affiliationPlan = plan
      state.isAffiliationCheckout = true
    },
    clearAffiliationCheckout: (state) => {
      state.affiliationTotal = null
      state.affiliationPoints = null
      state.affiliationPlan = null
      state.isAffiliationCheckout = false
    },
    SET_OPEN: (state) => { state.open = !state.open },
    SET_RESUME: (state) => {
      state.resume = !state.resume
      state.buys = state.network = state.commissions = state.education = false
    },
    SET_BUYS: (state) => {
      state.buys = !state.buys
      state.resume = state.network = state.commissions = state.education = false
    },
    SET_NETWORK: (state) => {
      state.network = !state.network
      state.resume = state.buys = state.commissions = state.education = false
    },
    SET_COMMISSIONS: (state) => {
      state.commissions = !state.commissions
      state.resume = state.buys = state.network = state.education = false
    },
    SET_EDUCATION: (state) => {
      state.education = !state.education
      state.resume = state.buys = state.network = state.commissions = false
    },
    CLEAR_MENU_STATES: (state) => {
      state.resume = state.buys = state.network = state.commissions = state.education = false
    },
  },
  actions: {
    async restoreState({ commit }) {
      const keys = ['session', 'name', 'lastName', 'plan', 'country', 'photo', 'email', 'token', 'dni', 'address', 'city', 'birthdate'];
      keys.forEach(k => {
        const val = storage.get(k);
        if (val) commit(`SET_${k.toUpperCase()}`, val);
      });

      const office_id = storage.get('office_id');
      const path = storage.get('path');
      if (office_id) commit('SET_OFFICE_ID', { office_id, path });

      const boolKeys = ['affiliated', 'activated', '_activated', 'tree'];
      boolKeys.forEach(k => {
        const val = storage.get(k);
        if (val !== null) commit(`SET_${k.toUpperCase()}`, val === 'true');
      });

      const numKeys = ['total_points', 'balance', '_balance'];
      numKeys.forEach(k => {
        const val = storage.get(k);
        if (val !== null) commit(`SET_${k.toUpperCase()}`, parseFloat(val));
      });

      commit('CLEAR_MENU_STATES')
      return true;
    },
    clearState({ commit }) {
      const keys = ['session', 'name', 'lastName', 'affiliated', 'activated', '_activated', 'plan', 'country', 'photo', 'tree', 'email', 'token', 'address', 'city', 'birthdate', 'total_points', 'balance', '_balance'];
      keys.forEach(k => commit(`SET_${k.toUpperCase()}`, null));
      commit('SET_OFFICE_ID', { office_id: null, path: null });
      commit('CLEAR_MENU_STATES')
    }
  }
})
