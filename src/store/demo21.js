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
                params: value,
            })
            .then((response) => {
                return {
                    item: response.data.item,
                    ct_no: response.data.ctNo,
                    elev_no: response.data.elevNo,
                    s104: response.data.s104,
                    s105: response.data.s105,
                    s106: response.data.s106,
                    s107: response.data.s107,
                    s108: response.data.s108,
                    s109: response.data.s109,
                    s110: response.data.s110,
                    s01: response.data.s01,
                    elv_amnt: response.data.elvAmnt,
                    eng_amnt: response.data.engAmnt,
                    team_1_emp_no: response.data.team1EmpNo,
                    team_2_emp_no: response.data.team2EmpNo,
                    team_3_emp_no: response.data.team3EmpNo,
                    team_1_grade: response.data.team1Grade,
                    team_2_grade: response.data.team2Grade,
                    team_3_grade: response.data.team3Grade
                };
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