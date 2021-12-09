import axios from "axios";

export const state = {
    s110: null,
};

export const actions = {
    getS110({
        state,
        commit
    }, values) {
        return axios.get(`/redis/cntm110/CNTM030/S110`)
            .then((response) => {
                commit("setS110", response)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const mutations = {
    setS110(state, payload) {
        if (Array.isArray(payload.data)) {
            state.s110 = payload.data.map(value => {
                return { value: value.colValue, label: value.colDesc }
            });
        }
    }
}

export const getters = {};

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};