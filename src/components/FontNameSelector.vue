<template>
    <select class="font-family" v-model="selectedFamily" data-qa="font-name-selector">
        <option v-for="family in families" :value="family" :key="family" >
            {{family}}
        </option>
    </select>
</template>
<script lang="ts">
import Vue, { defineComponent } from 'vue';

export default defineComponent({name: 'font-family-selector',
    data() {
        return {
            families: ['Lato', 'Sans', 'Serif', 'Courier', 'Courier New']
        };
    },
    computed: {
        selectedFamily: {
            get() {
                return this.value;
            },
            set(newValue: string) {
                this.$emit('input', newValue);
                this.$emit('change', newValue);
            }
        }
    },
    props: {
        value: {default: 'Lato',
            type: String
        }
    }
})

</script>
