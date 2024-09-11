<template>
    <div class="open-sheet" ref="canvas-container"></div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue';
import { UI } from '@/lib/UI';
import { OpenDocument } from '@/lib/core/Document';

export default defineComponent({name: 'OpenSheet',
    data() {
        const ui: UI = undefined;

        return {
            ui
        };
    },
    mounted() {
        this.ui = new UI(this.$refs['canvas-container'] as HTMLElement);
        this.$emit('ready', this.ui);
        this.ui.addOnChangeEventListener((doc: OpenDocument) => {
          this.$emit('change', doc);
        });
    },
    methods: {
        execute(command: string, args?: any) {
            this.ui.execCmd(command, args);
        },
        load(file: string) {
            this.ui.load(file);
        }
    }
})

</script>

<style scoped>
    .open-sheet {
        flex: 1;
        position: relative;
    }
</style>
