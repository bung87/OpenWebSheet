<template>
    <select class="font-size" v-model="selectedSize">
        <option v-for="size in sizes" :value="size" :key="size">
            {{size}}
        </option>
    </select>
</template>
<script lang="ts">
import Vue, { defineComponent } from 'vue';

export default defineComponent({name: 'font-size-selector',
    data() {
        return {
            sizes: [6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 22, 24, 26, 28, 32, 36, 48, 72]
        };
    },
    computed: {
        selectedSize: {
            get() {
                return this.value;
            },
            set(newValue: number) {
                this.$emit('input', newValue);
                this.$emit('change', newValue);
            }
        }
    },
    props: {
        value: {default: 12,
            type: Number
        }
    }
})

</script>
