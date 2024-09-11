<script lang="ts">
import Vue, { defineComponent, PropType } from 'vue';
import { RibbonMenuItem } from '@/components/RibbonMenu';
import Ribbon from '@/components/Ribbon.vue';
import ControlBox from '@/components/ControlBox.vue';
import CellBorderStyle from '@/components/CellBorderStyle.vue';
import FontSizeSelector from '@/components/FontSizeSelector.vue';
import ActionGroup from '@/components/ActionGroup.vue';
import ColorPicker from '@/components/ColorPicker.vue';
import ActionButton from '@/components/ActionButton.vue';
import { Appearance, TextAlign } from '@/lib/core/Appearance';
import FontFamilySelector from '@/components/FontNameSelector.vue';
import { Color } from '@/lib/common/types';

export default defineComponent({
  name: 'RibbonMenu',
  components: {
    FontFamilySelector,
    ActionButton, ColorPicker, ActionGroup, FontSizeSelector, CellBorderStyle, ControlBox, Ribbon,
  },
    data() {
      const menu: RibbonMenuItem[] = [
              {name: 'menu-home', label: 'Home'},
              {name: 'menu-formulas', label: 'Formulas'},
              {name: 'menu-data', label: 'Data'},
              {name: 'menu-view', label: 'View'},
              {name: 'menu-info', label: 'About'},
            ];
      const borderColor: Color = 'black';

        return {
            active: 'menu-home',
            borderColor,
            menu,
            fileMode: 'file'
        };
    },
    computed: {
        isLocalMode() {
            return this.fileMode === 'local';
        },
        activeStyle() {
            return this.appearance || new Appearance();
        },
        textAlignment() {
            return [
              {
                name: 'left',
                selected: this.activeStyle.textAlign === TextAlign.Left,
              },
              {
                name: 'center',
                selected: this.activeStyle.textAlign === TextAlign.Center,
              },
              {
                name: 'right',
                selected: this.activeStyle.textAlign === TextAlign.Right,
              },
            ];
        },
        fontStyle() {
            return [
              {name: 'bold', selected: this.activeStyle.bold},
              {name: 'italic', selected: this.activeStyle.italic},
              {name: 'underline', selected: this.activeStyle.underline},
            ];
        },
        foreColor: {
            get() {
                return this.activeStyle.text;
            },
            set(color: string) {
                this.onAction('fg-color', color);
            }
        },
        fillColor: {
            get() {
                return this.activeStyle.background;
            },
            set(color: string) {
                this.onAction('bg-color', color);
            }
        },
        fontSize: {
            get() {
                return this.activeStyle.fontSize;
            },
            set(newSize: number) {
                this.onAction('font-size', newSize);
            }
        },
        fontFamily: {
            get() {
                return this.activeStyle.fontName;
            },
            set(newFont: string) {
                this.onAction('font-name', newFont);
            }
        }
    },
    methods: {
        changeMode(newMode: string) {
            this.fileMode = newMode;
            this.$emit('mode-changed', newMode );
        },
        onBorderChanged(borderStructure: string) {
            this.onAction(borderStructure, this.borderColor);
        },
        onAlign(alignment: string) {
            this.onAction('align', alignment);
        },
        toggleMerge() {
            this.onAction(this.state.isMerged ? 'unmerge' : 'merge');
        },
        onAction(actionName: string, args?: any) {
            this.$emit('action', {actionName, args});
        }
    },
    props: {
        appearance: {
            type: Object as PropType<Appearance>
        },
        state: {default: () => ({isMerged: true}),
            type: Object as PropType<{ isMerged: boolean }>
        }
    }
})

</script>

<template>
    <div>
        <ribbon :menu="menu" v-model="active">
            <div slot="menu-home">
                <control-box label="Local Storage" v-if="isLocalMode">
                    <span style="display: flex;align-content: center;flex-direction: column;align-items: center">
                    <i @click="changeMode('file')"
                       class="far fa-times-circle xx-large-font flat-button"></i>
                    <span style="padding: 5px">
                        Back to file mode
                    </span>
                    </span>
                </control-box>
                <control-box label="Document" class="last" v-else>
                    <div style="display: flex;padding: 10px 5px;text-align: center">
                        <i class="fas fa-save x-large-font flat-button"
                           @click="onAction('save-ows')">
                        </i>
                        <span class="seperator">
                        </span>
                        <i class="fas fa-folder x-large-font flat-button"
                           @click="onAction('load-ows')">
                        </i>
                        <span class="seperator">
                        </span>
                        <i @click="changeMode('local')"
                           class="fas fa-warehouse x-large-font flat-button"></i>
                    </div>
                </control-box>

                <control-box label="Font" class="independent">
                    <p>
                        <font-family-selector v-model="fontFamily"/>
                        <font-size-selector v-model="fontSize"/>
                    </p>
                    <p>
                        <action-group :value="fontStyle" style="float:left;margin-right:15px;" @action="onAction">
                            <i slot="bold" class="fa fa-bold"></i>
                            <i slot="italic" class="fa fa-italic"/>
                            <i slot="underline" class="fa fa-underline"></i>
                        </action-group>
                        <color-picker v-model="foreColor">
                            <i class="fas fa-palette"></i>
                        </color-picker>
                    </p>
                </control-box>
                <control-box label="Format" class="last">
                    <p>
                        <color-picker label="Fill color" v-model="fillColor">
                            <i slot="prefix" class="fa fa-fill"></i>
                        </color-picker>
                    </p>
                    <p>
                        <action-group :value="textAlignment" @action="onAlign">
                            <i slot="left" class="fa fa-align-left"></i>
                            <i slot="center" class="fa fa-align-center"></i>
                            <i slot="right" class="fa fa-align-right"></i>
                        </action-group>

                    </p>
                </control-box>
                <control-box label="Cell" class="independent">
                    <p>
                        <action-button :class="{on:state.isMerged}"
                                       label="Merge"
                                       @click="toggleMerge">
                            <i slot="prefix" class="fa fa-th"></i>
                        </action-button>
                    </p>
                    <p>
                        <color-picker label="Border" v-model="borderColor"/>
                    </p>
                </control-box>
                <control-box label="Borders">
                    <cell-border-style @change="onBorderChanged"/>
                </control-box>
            </div>
            <div slot="menu-formulas">
                <control-box label="Mathematical" style="flex:1"/>
                <control-box label="Statistics" class="last" style="flex:1"/>
                <control-box label="User Defined Functions" class="independent" style="flex:3"/>
            </div>
            <div slot="menu-data">
                <control-box label="File">
                    <div style="margin:10px 20px">
                        <i class="fa fa-file-excel" style="font-size:xx-large"></i>
                    </div>
                </control-box>
                <control-box label="Open Office">
                    <action-group :value="[{name:'import',label:'Import'},{name:'export',label:'Export'}]"/>
                </control-box>
                <control-box label="MS Excel" style="flex:1" class="last">
                    <action-group :value="[{name:'import',label:'Import'},{name:'export',label:'Export'}]"/>
                </control-box>
                <control-box style="flex:4" label="3rd Parties"/>
            </div>
            <div slot="menu-view">
                <control-box label="Print">
                    <div style="margin:5px 20px">
                        <i class="fa fa-print" style="font-size:xx-large"></i>
                    </div>
                </control-box>
                <control-box label="Layout" style="flex:1">
                </control-box>
            </div>
            <div slot="menu-info" style="flex:1">
                <control-box label="OSI">
                    <span style="font-size:xx-large;color:#00454d;font-weight:bold">
                            <i class="fab fa-osi"></i>
                        </span>
                </control-box>
                <control-box label="About Open Web Sheet Project" style="flex:1;" :grid="false">
                    <span style="flex: 1">
                        Designed and developed by <strong>Siamand</strong><br/>
                        3rd Parties: <strong>FontAwesome Icons</strong> & <strong>Google noto web
                        font</strong><br/>
                        Licence: <strong>MIT Licence</strong>
                    </span>
                    <span style="align-self: flex-start">
                            <a href="https://siamand.cc"> <i class="fa fa-link"></i> Developer's site</a> |
                            <a href="https://github.com/code-by-sia/OpenWebSheet"><i class="fab fa-github"></i>
                                Source Code</a>
                    </span>
                </control-box>
            </div>
        </ribbon>
    </div>
</template>

<style scoped>

    .seperator {
        margin: 0 5px;
        border-right: solid #ccc thin;
        border-left: solid thin #eee
    }

    .about-menu a {
        text-decoration: none;
    }

</style>
