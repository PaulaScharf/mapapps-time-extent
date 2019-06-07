/*
 * Copyright (C) 2019 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Vue from "apprt-vue/Vue";
import TimeExtentWidget from "./TimeExtentWidget.vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding from "apprt-binding/Binding";

export default class TimeExtentWidgetFactory {
    activate (){
        this._initComponent();
    }

    createInstance(){
        return VueDijit(this.widget);
    }

    _initComponent(){
        const widget = this.widget = new Vue(TimeExtentWidget);
        let model = this._timeExtentWidgetModel;
        widget.i18n = this._i18n.get().ui;

        widget.$on('setFilter', () => {
            model.setFilter();
        });

        Binding.for(widget, model)
            .syncAll("layers", "selectedLayerId","startDate", "endDate", "startTime", "endTime", "locale")
            .enable()
            .syncToLeftNow();
    }
}
