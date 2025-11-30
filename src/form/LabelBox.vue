<template>
    <!-- label-box -->
    <div :style="style.box" @click="hdlClick">
        <span :style="style.label">
            {{item.label}}
        </span>
    </div>
</template>

<script setup>
import {ref, computed} from "vue";
import styleModule from './style.js'

const props = defineProps(["scopeThis", "myProps", "dataBox", "item"]);

const style = {
    box: computed(()=>{
        return styleModule.label.box(props.item)
    }),
    label: computed(()=>{
        return styleModule.label.label(props.item)
    }),
}

const hdlClick = () => {
    if(props.item.hdlLabelClick){
        props.item.hdlLabelClick(props.scopeThis, props.dataBox.fieldsValue);
    }
}
</script>

<style scoped>

</style>