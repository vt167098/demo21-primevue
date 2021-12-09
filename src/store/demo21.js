import axios from "axios";

export const state = {
    data: null,
    loading: false,
    cntm120: null,
};

export const actions = {
    getDemo21Data({
        commit,
        state
    }, value) {
        commit.loading = true;
        return axios
            .get(`/demo21/query`, {
                params: value,
            })
            .then((response) => {
                commit.loading = false;
                return response.data;
            })
            .catch((err) => {
                commit.loading = false;
                console.error(err);
            });
    },
    getCntm120({
        commit,
        state
    }, value) {
        commit.loading = true;
        return axios
            .get(`/demo21/query2`, {
                params: Object.assign({
                        size: 1,
                    },
                    value
                ),
            })
            .then((response) => {
                return response.data
                    .map(val => {
                        return { item: val.item, ct_no: val.ctNo, elev_no: val.elevNo, s104: val.s104, s105: val.s105, s106: val.s106, s107: val.s107, s108: val.s108, s109: val.s109, s110: val.s110, s01: val.s01, elv_amnt: val.elvAmnt, eng_amnt: val.engAmnt, team_1_emp_no: val.team1EmpNo, team_2_emp_no: val.team2EmpNo, team_3_emp_no: val.team3EmpNo, team_1_grade: val.team1Grade, team_2_grade: val.team2Grade, team_3_grade: val.team3Grade }
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    },
};

export const mutations = {
    setData(state, payload) {
        state.data = payload.map((val) => {
            return {
                pro_ctr: val.proCtr,
                item_ct_no: `${val.item}-${val.ctNo}`,
                sale_no: `${val.empName}(${val.saleNo})`,
                buld_name: val.buldName,
                nt_amnt: val.ntAmnt,
                comp_2: val.comp2,
                ct_date: val.ctDate,
                sal_beg_cost: val.salBegCost,
                cust_no: `${val.custNo}-${val.custName}`,
            };
        });
    },
    setCntm120(state, payload) {
        state.cntm120 = payload;
    },
    setLoading(state, payload) {
        state.loading = payload;
    },
};
export const getters = {};

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};