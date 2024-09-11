<template>
    <button class="action" :disabled="disabled" @click="$emit('click')" data-qa="action">
        <slot>
            <slot name="prefix"/>
            {{label}}
            <slot name="postfix"/>
        </slot>
    </button>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue';

export default defineComponent({name: 'ActionButton',
    props: {
        label: {
            type: String
        },
        disabled: {default: false,
            type: Boolean
        }
    }
})

</script>

<style lang="scss" scoped>
    button.action {
        border: solid thin #ccc;
        font-size: x-small;
        border-radius: 2px;
        background: linear-gradient(to top, #ece9e6, #ffffff);
        padding: 3px;
        width: 100%;

        &.on {
            background: linear-gradient(to top, #cccccc, #efefef);
        }
    }
</style>
