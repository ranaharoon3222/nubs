/**
 * state
 */
const state = {
  cart: [],
  current_cart: {},
  test: 'test',
  cart_popup: false,
  count: 0,
  total: 0,
};

/**
 * getters
 */
const getters = {};

/**
 * mutations
 */
const mutations = {
  SAVE_CART(state, payload) {
    state.total = (payload.total_price / 100).toFixed(2);
    state.cart = payload;
    state.count = payload.item_count;
  },

  CURRENT_CART(state, { current, full_cart }) {
    state.current_cart = current;
    state.cart = full_cart;
    state.count = full_cart.item_count;
    state.cart_popup = true;
  },
  CLOSE_POPUP(state) {
    state.cart_popup = false;
  },
};

/**
 * actions
 */
const actions = {
  save_cart({ commit }) {
    fetch('/cart.js')
      .then((response) => response.json())
      .then((data) => {
        commit('SAVE_CART', data);
      })
      .catch((error) => console.error(error));
  },

  current_cart({ commit }, payload) {
    fetch('/cart.js')
      .then((response) => response.json())
      .then((data) => {
        commit('CURRENT_CART', { current: payload, full_cart: data });
      })
      .catch((error) => console.error(error));
  },
  close_popup({ commit }) {
    commit('CLOSE_POPUP');
  },
};

/**
 * export
 */
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
