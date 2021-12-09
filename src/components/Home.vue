<template>
  <HomeToolBar :display="display" :page="page" @changeValue="changeValue" />
  <div class="card">
    <DataTable :value="list" showGridlines class="p-datatable-sm" responsiveLayout="scroll">
      <template #header> 合約主檔 </template>
      <Column field="pro_ctr" header="中心"></Column>
      <Column field="item_ct_no" header="合約編號"></Column>
      <Column field="buld_name" header="大樓名稱"></Column>
      <Column field="ct_date" header="成交日期"></Column>
      <Column field="sale_no" header="業務員"></Column>
      <Column field="nt_amnt" header="合約金額"></Column>
      <Column field="cust_no" header="客戶名稱"></Column>
      <Column field="comp_2" header="機更碼"></Column>
      <Column header="功能">
        <template #body="slotProps">
          <Button
            label="工委單"
            class="p-button-info p-button-sm"
            icon="pi pi-pencil"
            @click="openDisplay2(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
  <Dialog v-model:visible="display" :modal="true" :style="{ width: '50vw' }">
    <template #header>
      <h3>設定查詢條件</h3>
    </template>
    <div
      class="grid"
      v-for="condition in conditions"
      :key="condition.id"
      @click="key_id = condition.id"
    >
      <div class="col">
        <Dropdown
          v-model="condition.col_name"
          :options="itemOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="選擇查詢欄位..."
          style="width: 190px"
        />
      </div>
      <div class="col">
        <Dropdown
          v-model="condition.option"
          :options="optOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="選擇查詢條件..."
          style="width: 150px"
          @change="selectedOption"
        />
      </div>
      <div class="col">
        <InputText
          v-model="condition.value1"
          placeholder="輸入查詢值1..."
          style="width: 140px"
        />
      </div>
      <div class="col inline-flex">
        <InputText
          v-model="condition.value2"
          placeholder="輸入查詢值2..."
          style="width: 140px"
          :disabled="condition.disabled"
        />
        <Button
          type="info"
          icon="pi pi-trash"
          @click="removeCondition(condition.id)"
        />
      </div>
    </div>
    <template #footer>
      <Button
        label="新增欄位"
        icon="pi pi-plus"
        class="p-button-text"
        @click="addContion"
      />
      <Button
        label="關閉"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeDisplay"
      />
      <Button label="執行" icon="pi pi-check" @click="getData" autofocus />
    </template>
  </Dialog>
  <Dialog v-model:visible="display2" :modal="true" :style="{ width: '60vw' }">
    <template #header> 工委單 </template>
    <Form120 />
    <template #footer>
      <Button
        label="上一筆"
        icon="pi pi-angle-left"
        class="bg-blue-200 hover:bg-red-300"
        @click="handleRow('previous')"
      />
      <Button
        label="下一筆"
        icon="pi pi-angle-right"
        class="bg-green-300 hover:bg-blue-300"
        @click="handleRow('next')"
      />
      <Button label="取消" class="bg-pink-200" />
      <Button label="確認" class="bg-indigo-300" autofocus />
    </template>
  </Dialog>
  <Toast position="top-center" />
</template>
<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import HomeToolBar from "./HomeToolBar.vue";
import Form120 from "./Form120.vue";

export default {
  name: "Home",
  setup() {
    const store = useStore();
    const toast = useToast();
    const conditions = ref([
      {
        id: 1,
        col_name: "proCtr",
        option: "eq",
        value1: "",
        value2: "",
        disabled: true,
      },
      {
        id: 2,
        col_name: "item",
        option: "eq",
        value1: "",
        value2: "",
        disabled: true,
      },
      {
        id: 3,
        col_name: "ctNo",
        option: "eq",
        value1: "",
        value2: "",
        disabled: true,
      },
      {
        id: 4,
        col_name: "saleNo",
        option: "eq",
        value1: "",
        value2: "",
        disabled: true,
      },
    ]);
    const itemOptions = ref([
      { value: "proCtr", label: "利潤中心" },
      { value: "item", label: "營業項目" },
      { value: "ctNo", label: "合約編號" },
      { value: "saleNo", label: "業務員" },
      { value: "comp2", label: "機更碼" },
      { value: "custNo", label: "客戶編號" },
    ]);
    const display = ref(false);
    const display2 = ref(false);
    const key_id = ref();
    const list = ref([]);
    const page = ref(0);

    const changeValue = (val) => {
      val.display != undefined && openDisplay(val.display);
      if (val.page != undefined) {
        page.value = val.page < 0 ? 0 : val.page;
        getData();
      }
    };

    const openDisplay = (val) => {
      display.value = val == undefined ? true : val;
    };

    const closeDisplay = () => {
      display.value = false;
    };

    const openDisplay2 = (val) => {
      getCntm120({
        item: val.item_ct_no.split("-")[0],
        ctNo: val.item_ct_no.split("-")[1],
        elevNo: 1,
        size: 1
      });
    };

    const closeDisplay2 = () => {
      display2.value = false;
    };

    const handleRow = (val) => {
      const elev_no = val=="previous"&&store.state.demo21.cntm120.elev_no==1?0:(val=="next"?1:-1)+store.state.demo21.cntm120.elev_no;
      getCntm120({
        item: store.state.demo21.cntm120.item,
        ctNo: store.state.demo21.cntm120.ct_no,
        elevNo: elev_no,
        size: 1
      });
    }

    const selectedOption = (event, value) => {
      if (event.value == "bt") {
        conditions.value[key_id.value - 1].disabled = false;
      } else {
        conditions.value[key_id.value - 1].disabled = true;
      }
    };

    const addContion = () => {
      conditions.value.push({
        id: conditions.value.length + 1,
        col_name: "",
        option: "eq",
        value1: "",
        value2: "",
        disabled: true,
      });
    };

    const removeCondition = (val) => {
      conditions.value = conditions.value
        .filter((cond) => cond.id != val)
        .map((value, index) => {
          value.id = index + 1;
          return value;
        });
    };

    const getData = () => {
      const param = {
        sort: "proCtr",
        order: "asc",
        sort1: "saleNo",
        order1: "desc",
        size: 10,
        page: page.value,
      };
      new Promise((resolve, reject) => {
        resolve(
          store.dispatch(
            "demo21/getDemo21Data",
            conditions.value.reduce(function (accu, curr) {
              if (curr.value1 != "" || curr.value2 != "") {
                switch (curr.option) {
                  case "bt":
                    accu[curr.col_name + "-0"] = curr.value1;
                    accu[curr.col_name + "-1"] = curr.value2;
                    accu[curr.col_name + "-op"] = curr.option;
                    break;
                  case "mv":
                    var mvStr = curr.value1
                      .split(",")
                      .map(function (val, index) {
                        accu[curr.col_name + "-" + index] = val;
                        return curr.col_name + "-" + index + "=" + val;
                      })
                      .join("&");
                    accu[curr.col_name + "-op"] = curr.option;
                    break;
                  case "ey":
                    accu[curr.col_name + "-op"] = curr.option;
                    break;
                  case "ny":
                    accu[curr.col_name + "-op"] = curr.option;
                    break;
                  default:
                    accu[curr.col_name] = curr.value1;
                    accu[curr.col_name + "-op"] = curr.option;
                    break;
                }
              }
              return accu;
            }, param)
          )
        );
      })
        .then((success) => {
          store.commit("demo21/setData", success);
          list.value = store.state.demo21.data;
          display.value = false;
        })
        .catch((error) => {
          console.log(`dispatch demo21/getDemo21Data error: ${error}`);
        });
    };

    const getCntm120 = (val) => {
      new Promise((resolve, reject) => {
        resolve(store.dispatch("demo21/getCntm120", val));
      })
        .then((success) => {
          if (success.length>0&&success[0].item != undefined) {
            store.commit("demo21/setCntm120", success[0]);
            display2.value = true;
          } else if (success.length==0 && val.item==store.state.demo21.cntm120.item && val.ctNo==store.state.demo21.cntm120.ct_no) {
            toast.add({
              severity: "warn",
              summary: "工委單查詢",
              detail: "無下一筆資料",
              life: 3000,
            });
            display2.value = true;  
          } else {
            toast.add({
              severity: "warn",
              summary: "工委單查詢",
              detail: "查無資料",
              life: 3000,
            });
            display2.value = false;
          }
        })
        .catch((error) => {
          toast.add({
            severity: "error",
            summary: "工委單查詢",
            detail: "查詢異常",
            life: 3000,
          });
          display2.value = false;
        });
    };
    return {
      optOptions: ref([
        { value: "eq", label: "等於" },
        { value: "ne", label: "不等於" },
        { value: "ge", label: "大於等於" },
        { value: "le", label: "小於等於" },
        { value: "gt", label: "大於" },
        { value: "lt", label: "小於" },
        { value: "bt", label: "介於值1與值2" },
        { value: "mv", label: "符合任一值" },
        { value: "in", label: "包含值1" },
        { value: "sw", label: "開頭符合值1" },
        { value: "ew", label: "結尾符合值1" },
        { value: "ey", label: "值1為空" },
        { value: "ny", label: "值1不為空" },
      ]),
      itemOptions,
      conditions,
      display,
      display2,
      page,
      loading: computed(() => store.state.demo21.loading),
      openDisplay,
      openDisplay2,
      closeDisplay,
      closeDisplay2,
      selectedOption,
      key_id,
      addContion,
      removeCondition,
      list,
      getData,
      changeValue,
      handleRow
    };
  },
  components: {
    HomeToolBar: HomeToolBar,
    Form120: Form120,
  },
};
</script>
