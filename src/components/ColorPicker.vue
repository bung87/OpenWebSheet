<script lang="ts">
import Vue, { defineComponent } from 'vue';

export default defineComponent({name: 'ColorPicker',
    computed: {
        color: {
            get() {
                if (!this.value) {
                  return '#ffffff';
                }
                return this.value;
            },
            set(newValue) {
                this.$emit('input', newValue);
            }
        }
    },
    props: {
        value: {default: '#ffffff',
            type: String
        },
        label: {
            type: String
        }
    }
})

</script>
<template>
    <div class="color-picker" data-qa="color-picker">
        <label data-qa="label">
            <slot>
                <span class="prefix" v-if="!!$slots['prefix']">
                    <slot name="prefix"/>
                </span>
                {{label}}
                <slot name="postfix" class="postfix"/>
            </slot>
        </label>
        <input type="color" v-model="color" data-qa="input-el"/>
    </div>
</template>
<style lang="scss" scoped>
    .color-picker {
        display: flex;

        & label {
            display: flex;
            align-items: center;
            margin-right: 5px;
        }

        & .prefix {
            margin-right: 5px;
        }

        & .postfix {
            margin-left: 5px;
        }

        & input[type=color] {
            border: none;
            padding: 0;
            width: 20px;
        }
    }
</style>
