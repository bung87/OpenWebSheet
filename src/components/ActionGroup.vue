<template>
    <div class="action-group" data-qa="action-group">
        <action-button v-for="action in actions"
                       :key="action.name"
                       class="action-group-item"
                       :disabled="action.disabled"
                       :class="{'on':action.selected}"
                       @click="$emit('action',action.name)"
                       data-qa="action-item"
                       :data-qa-name="action.name"
        >
            <slot :name="action.name">
                {{action.label}}
            </slot>
        </action-button>
    </div>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from 'vue';
import Action from './Action';
import ActionButton from '@/components/ActionButton.vue';


export default defineComponent({
  name: 'ActionGroup',
  components: {ActionButton},
    computed: {
        actions() {
            return this.value;
        }
    },
    props: {
        value: {required: true,
            type: Array as PropType<Action[]>
        }
    }
})

</script>

<style lang="scss" scoped>
    .action-group {
        display: flex;

        & .action {
            border-radius: 0;
            padding: 4px 2px !important;

            &:not(:first-child) {
                border-left: none;
            }
        }

        &-item {
            border-right-style: none;
            cursor: pointer;
            min-width: 25px;
            padding: 4px;
            text-align: center;

            &:hover {
                text-decoration: underline;
                background: linear-gradient(to top, #dddddd, #ffffff);
            }

            &:disabled {
                color: #ccc;
                background: #fefefe;
                cursor: not-allowed;
                text-decoration: none !important;
            }

            &:first-child {
                border-radius: 3px 0 0 3px;
            }

            &:last-child {
                border-right-style: solid;
                border-radius: 0 3px 3px 0;
            }

        }
    }
</style>
