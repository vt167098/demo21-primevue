<template>
  <Toolbar>
    <template #start>
      <Button
        label="查詢"
        icon="pi pi-search"
        class="p-button-success mr-2"
        @click="openDisplay"
      />
    </template>

    <template #end>
      <Button
        icon="pi pi-angle-left"
        class="p-button-info mr-2"
        @click="previousPage"
      />
      <Button
        icon="pi pi-angle-right"
        class="p-button-info mr-2"
        @click="nextPage"
      />
    </template>
  </Toolbar>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HomeToolBar",
  props: ["display", "page"],
  setup(props, { emit }) {
    const openDisplay = () => {
      emit("changeValue", { display: !props.display });
    };

    const previousPage = () => {
      emit("changeValue", { page: props.page - 1 });
    };

    const nextPage = () => {
      emit("changeValue", { page: props.page + 1 });
    };

    return {
      openDisplay,
      previousPage,
      nextPage,
    };
  },
};
</script>