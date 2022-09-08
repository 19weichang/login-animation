<template>
  <div id="timeRange">
    <li>
      <div class="optionsName">
        <FieldTimeOutlined class="icon"/>time
      </div>
      <a-space>
        <a-select
          size='large'
          ref="select"
          style="width: 180px"
          class="selectSize"
        >
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </a-space>
    </li>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { loginStore } from '/ushow後台/ushow_admin/src/store/user'
  import { defineComponent,ref } from 'vue'
  import {
    FieldTimeOutlined,
  } from '@ant-design/icons-vue';
  defineComponent({
    components: {
      FieldTimeOutlined,
    },
  });
</script>

<style lang="scss" scoped>
  
  li {
      display: flex;
      justify-content: space-between;
      list-style: none;
      padding: 20px 0px;
      border-bottom: 2px solid darkgray;
      cursor: pointer;
      .optionsName {
        .icon {
        background-color: darkgray;
        padding: 5px;
        margin-right: 5px;
        border-radius: 5px;
        }
      }
      .selectSize {
        margin: 0px 10px;
      }

    }
  </style>