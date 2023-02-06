<template>
  <v-text-field
      :model-value="modelValue"
      readonly
      :label="label">
    <template v-if="toolTip" v-slot:append>
      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
        </template>
        {{ toolTip }}
      </v-tooltip>
    </template>
    <template #append-inner>
      <v-btn
          icon="mdi-plus"
          variant="text"
          @click="plus"
      >
      </v-btn>
      <v-btn
          icon="mdi-minus"
          variant="text"
          @click="minus"
      >
      </v-btn>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
const props=
defineProps<{
  label?:string
  modelValue:number
  toolTip?:string
}>()
const emit=
defineEmits<{
  (e:'update:modelValue',value:number):void
}>()

function plus(){
  emit("update:modelValue",props.modelValue+1)
}
function minus(){
  if (props.modelValue>0){
    emit("update:modelValue",props.modelValue-1)
  }
}
</script>

<style scoped lang="scss">

</style>