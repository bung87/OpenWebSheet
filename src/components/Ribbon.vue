<script lang="ts">
import { RibbonMenuItem } from '@/components/RibbonMenu';
import { defineComponent, PropType } from "vue";

export default defineComponent({name: 'Ribbon',
    computed: {
        active: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit('input', newValue);
            }
        }
    },
    props: {
        value: {required: true,
            type: String
        },
        menu: {required: true,
            type: Array as PropType<RibbonMenuItem[]>
        }
    }
})

</script>

<template>
    <div class="ribbon-menu">
        <ul class="menu" data-qa="menu">
            <li v-for="item in menu"
                :key="item.name"
                :data-qa="item"
                class="menu-label"
                :class="{'active':active===item.name}"
                @click="active = item.name"
            >
                {{item.label}}
            </li>
        </ul>
        <div class="menu-content">
            <div class="menu-content-item"
                 v-for="item in menu"
                 :key="item.name"
                 :class="{'active': (active === item.name)}">
                <slot :name="item.name">
                    <fieldset>
                        <legend>{{item.label}}</legend>
                        <span class="default-place-holder">placeholder for {{item.name}}</span>
                    </fieldset>
                </slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .italic {
        font-style: italic;
    }

    .ribbon-menu {
        & .menu {
            margin: 0;
            padding: 5px 0 0 0;
            display: flex;
            flex-direction: row;
            list-style: none;
            background: #00454d;

            &-label {
                padding: 4px 10px;
                margin: 0 5px;
                color: #fff;
                font-weight: bolder;
                text-shadow: none;
                cursor: pointer;

                &:first-child {
                    margin-left: 20px;
                }

                &:hover {
                    color: #fff;
                }

                &.active {
                    border-radius: 3px 3px 0 0;
                    background: #fff;
                    color: #00454d;
                    border-bottom: solid thin #fff;
                }
            }

            &-content {
                padding: 10px 5px;
                height: 90px;
                flex-direction: row;
                background: #ece9e6;
                background: -webkit-linear-gradient(to top, #ece9e6, #ffffff);
                background: linear-gradient(to top, #ece9e6, #ffffff);

                &-item {
                    display: none;

                    &.active {
                        display: flex;

                        > div {
                            display: flex;
                            flex: 1;
                        }
                    }

                    & div.spacer {
                        flex: 1;
                        margin: 0 5px;
                    }

                    & select {
                        border: solid thin #ccc;
                        border-radius: 0;
                    }

                }
            }
        }
    }
</style>
