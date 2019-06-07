<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container grid-list-md text-xs-center>
        <v-select
            :items="layers"
            v-model="selectedLayerId"
            class="pa-0"
            item-value="id"
            item-text="title"
            single-line
            hide-details
        />

        <v-layout row wrap>
            <v-flex xs8>
                <v-menu
                    lazy
                    ref = "menuStartDate"
                    :close-on-content-click="false"
                    v-model="menuStartDate"
                    :return-value.sync= "startDate"
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
                                <v-btn flat color="primary" @click="menuStartDate = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menuStartDate.save(startDate)">OK</v-btn>
                            </v-card-actions>
                        </template>
                    </v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs4>
                <v-menu
                    lazy
                    :close-on-content-click="false"
                    ref = "menuStartTime"
                    v-model="menuStartTime"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                >
                    <v-text-field
                        slot="activator"
                        label="start time"
                        v-model="startTime"
                        prepend-icon="event"
                        readonly
                    ></v-text-field>
                    <v-time-picker v-model="startTime" no-title scrollable actions>
                        <template scope="{ save, cancel }">
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menuStartTime = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menuStartTime.save(startTime)">OK</v-btn>
                            </v-card-actions>
                        </template>
                    </v-time-picker>
                </v-menu>
            </v-flex>
            <v-flex xs8>
                <v-menu
                    lazy
                    :close-on-content-click="false"
                    ref = "menuEndDate"
                    v-model="menuEndDate"
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
                                <v-btn flat color="primary" @click="menuEndDate = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menuEndDate.save(endDate)">OK</v-btn>
                            </v-card-actions>
                        </template>
                    </v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs4>
                <v-menu
                    lazy
                    :close-on-content-click="false"
                    ref = "menuEndTime"
                    v-model="menuEndTime"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                >
                    <v-text-field
                        slot="activator"
                        label="end time"
                        v-model="endTime"
                        prepend-icon="event"
                        readonly
                    ></v-text-field>
                    <v-time-picker v-model="endTime" no-title scrollable actions>
                        <template scope="{ save, cancel }">
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menuEndTime = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menuEndTime.save(endTime)">OK</v-btn>
                            </v-card-actions>
                        </template>
                    </v-time-picker>
                </v-menu>
            </v-flex>


            <v-btn
                block
                ripple
                color="primary"
                @click="$emit('setFilter', {})">
                {{ i18n.filter }}
            </v-btn>
        </v-layout>
    </v-container>
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
            },
            startTime: {
                type: Date,
                default: null
            },
            endTime: {
                type: Date,
                default: null
            },
            menuStartTime: {
                type: Boolean,
                default: false
            },
            menuEndTime: {
                type: Boolean,
                default: false
            },
            menuStartDate: {
                type: Boolean,
                default: false
            },
            menuEndDate: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
