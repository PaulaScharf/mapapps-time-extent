<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-select
            :items="layers"
            v-model="selectedLayerId"
            class="pa-0"
            item-value="id"
            item-text="title"
            single-line
            hide-details
        />

        <v-menu
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
        >
            <v-text-field
                slot="activator"
                label="Starting Date"
                v-model="startDate"
                prepend-icon="event"
                readonly
            ></v-text-field>
            <v-date-picker v-model="startDate" no-title scrollable actions>
                <template scope="{ save, cancel }">
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="$emit('cancelStart', {})">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$emit('saveStart', {})">OK</v-btn>
                    </v-card-actions>
                </template>
            </v-date-picker>
        </v-menu>

        <v-menu
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
        >
            <v-text-field
                slot="activator"
                label="End Date"
                v-model="endDate"
                prepend-icon="event"
                readonly
            ></v-text-field>
            <v-date-picker v-model="endDate" no-title scrollable actions>
                <template scope="{ save, cancel }">
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="$emit('cancelEnd', {})">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$emit('saveEnd', {})">OK</v-btn>
                    </v-card-actions>
                </template>
            </v-date-picker>
        </v-menu>

        <v-btn
            block
            ripple
            color="primary"
            @click="$emit('setFilter', {})">
            {{ i18n.filter }}
        </v-btn>

    </div>
</template>
<script>
    import Bindable from "apprt-vue/mixins/Bindable";

    export default {
        components: {},
        mixins: [Bindable],
        props: {
            i18n: {
                type: Object,
                default: function () {
                    return {
                        filter: "set filter"
                    }
                }
            },
            layers: {
                type: Array,
                default: function(){
                    return [];
                }
            },
            selectedLayerId: {
                type: String,
                default: ""
            },
            startDate:{
                type: Date,
                default: null
            },
            endDate:{
                type: Date,
                default: null
            }
        }
    };
</script>
