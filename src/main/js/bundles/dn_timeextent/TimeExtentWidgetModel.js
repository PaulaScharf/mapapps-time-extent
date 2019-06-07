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
        let startDate = this.startDate;
        let endDate = this.endDate;
        let map = this._mapWidgetModel;
        let layer = map.map.findLayerById(selectedLayerId);
        map.view.whenLayerView(layer).then((layerView)=> {
            var timeExtent = new TimeExtent();
            timeExtent.start = new Date(startDate);
            timeExtent.end = new Date(endDate);
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
