import {declare} from "apprt-core/Mutable";
import TimeExtent from "esri/TimeExtent";
import FeatureFilter from "esri/views/layers/support/FeatureFilter";

export default declare({
    layers: [],
    selectedLayerId: "",

    activate() {
        let layers = this.layers = this._getLayers();
        if (layers.length) {
            this.selectedLayerId = layers[0].id;
        }

        let mapWidgetModel = this._mapWidgetModel;
        let map = mapWidgetModel.map;
        map.layers.on("after-changes", () => {
            this.layers = this._getLayers();
            this.selectedLayerId = this.layers[0].id;
        });
    },

    setFilter(){
        let selectedLayerId = this.selectedLayerId;
        let map = this._mapWidgetModel;
        let layer = map.map.findLayerById(selectedLayerId);
        let that = this;
        map.view.whenLayerView(layer).then((layerView)=> {
            let startDate = that.startDate;
            let endDate = that.endDate;
            let startTime = that.startTime;
            let endTime = that.endTime;
            let timeExtent = new TimeExtent();

            if(startTime){
                timeExtent.start = new Date(startDate);
                timeExtent.start.setHours(Number(startTime.split(":")[0]));
                timeExtent.start.setMinutes(Number(startTime.split(":")[1]));
            }
            if(endTime){
                timeExtent.end = new Date(endDate);
                timeExtent.end.setHours(Number(endTime.split(":")[0]));
                timeExtent.end.setMinutes(Number(endTime.split(":")[1]));
            }
            layerView.filter = new FeatureFilter({
                timeExtent: timeExtent
            });
            console.log("success")
        });

    },

    cancelStart(){

    },

    saveStart(){
      console.log("saved Start");
    },

    cancelEnd(){

    },

    saveEnd(){
        console.log("saved Start");
    },

    _getLayers() {
        let mapWidgetModel = this._mapWidgetModel;
        let map = mapWidgetModel.map;
        let layers = map.layers.toArray();
        let featureLayers = layers.filter((layer) => {
            return layer.type === "feature";
        });
        return featureLayers.map((layer) => {
            return {
                id: layer.id,
                title: layer.title
            }
        });
    }
})
