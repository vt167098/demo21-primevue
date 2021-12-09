<template>
    <div class="p-fluid flex flex-nowrap my-2">
      <div class="p-field w-1 mx-1.5">
        <label for="item">營業項目</label>
        <InputText v-model="form.item" id="item" type="text" />
      </div>
      <div class="p-field w-2 mx-1.5">
        <label for="ct_no">合約編號</label>
        <InputNumber v-model="form.ct_no" id="ct_no" :useGrouping="false" />
      </div>
      <div class="p-field w-2 mx-1.5">
        <label for="ct_no">號機</label>
        <InputNumber v-model="form.elev_no" id="elev_no" :useGrouping="false" />
      </div>
    </div>
    <div class="p-fluid flex flex-nowrap my-2">
      <div class="p-field w-3 mx-0.5">
        <label for="s110">s110</label>
        <Dropdown
          inputId="s110"
          v-model="form.s110"
          :options="opts110"
          optionLabel="label"
          optionValue="value"
          placeholder="請選擇控制方式"
        />
      </div>
      <div class="p-field w-1 mx-0.5">
        <label for="s104">s104</label>
        <InputText v-model="form.s104" id="s104" type="text" />
      </div>
      <div class="p-field w-1 mx-0.5">
        <label for="s105">s105</label>
        <InputNumber v-model="form.s105" id="s105" mode="decimal" />
      </div>
      <div class="p-field w-1 mx-0.5">
        <label for="s106">s106</label>
        <InputNumber v-model="form.s106" id="s106" mode="decimal" :useGrouping="false" />
      </div>
      <div class="p-field w-1 mx-0.5">
        <label for="s107">s107</label>
        <InputText v-model="form.s107" id="s107" type="text" />
      </div>
      <div class="p-field w-1 mx-0.5">
        <label for="s108">s108</label>
        <InputNumber v-model="form.s108" id="s108" mode="decimal" :useGrouping="false" />
      </div>
      <div class="p-field w-1 mx-0.5">
        <label for="s109">s109</label>
        <InputNumber v-model="form.s109" id="s109" />
      </div>
      <div class="p-field w-1 mx-0.5">
        <label for="s01">s01</label>
        <InputNumber v-model="form.s01" id="s01" />
      </div>
    </div>
    <div class="p-fluid flex flex-nowrap my-2">
      <div class="p-field w-4 mx-1.5">
        <label for="elv_amnt">買賣金額</label>
        <InputNumber
          id="elv_amnt"
          v-model="form.elv_amnt"
          mode="currency"
          currency="TWD"
          locale="en-US"
        />
      </div>
      <div class="p-field w-4 mx-1.5">
        <label for="eng_amnt">承攬金額</label>
        <InputNumber
          id="eng_amnt"
          v-model="form.eng_amnt"
          mode="currency"
          currency="TWD"
          locale="en-US"
        />
      </div>
    </div>
    <div class="p-fluid flex flex-nowrap my-2">
      <div class="p-field w-2 mx-0.5">
        <label for="team_1_grade">電氣級數</label>
        <InputText v-model="form.team_1_grade" id="team_1_grade" type="text" />
      </div>
      <div class="p-field w-2 mx-0.5">
        <label for="team_1_emp_no">電氣負責人</label>
        <InputNumber v-model="form.team_1_emp_no" id="team_1_emp_no" :useGrouping="false" />
      </div>
      <div class="p-field w-2 mx-0.5">
        <label for="team_2_grade">意匠級數</label>
        <InputText v-model="form.team_2_grade" id="team_2_grade" type="text" />
      </div>
      <div class="p-field w-2 mx-0.5">
        <label for="team_2_emp_no">意匠負責人</label>
        <InputNumber v-model="form.team_2_emp_no" id="team_2_emp_no" :useGrouping="false" />
      </div>
      <div class="p-field w-2 mx-0.5">
        <label for="team_3_grade">系統級數</label>
        <InputText v-model="form.team_3_grade" id="team_3_grade" type="text" />
      </div>
      <div class="p-field w-2 mx-0.5">
        <label for="team_3_emp_no">系統負責人</label>
        <InputNumber v-model="form.team_3_emp_no" id="team_3_emp_no" :useGrouping="false" />
      </div>
    </div>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  name: "Form120",
  setup() {
    const store = useStore()

    onBeforeMount(() => {
        store.dispatch("options/getS110")
    })

    return {
        form: computed(() => store.state.demo21.cntm120),    
        opts110: computed(() => store.state.options.s110)
    }
  },
};
</script>