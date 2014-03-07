define([
    'jquery',
    'backbone',
    'jquerymobile',
    'handlebars'
],
function($, Backbone, Mobile){

    var CanvasListView = Backbone.View.extend({

        el:'#canvas-listview',

        events:{
            'click .ajax-hl': 'routeToCanvas',
        },

        template: Handlebars.compile( $('#canvas-listview-template').html() ),

        initialize: function(){
            console.log('initialize CanvasListView.js');

            var self = this;

            self.render();
        },

        routeToCanvas: function(canvastype){

            console.log(canvastype);

            Backbone.history.navigate('canvas/'+canvastype, true);

        },

        render: function(){
            console.log('render CanvasListView.js');

            var self = this;

            // defined in app/collection/CanvasCollection.js
            // console.log(self.collection);

            var markup = self.template({ collection: self.collection.jsonArray });

            self.$el.html(markup);

            self.$el.collapsibleset('refresh');

            // jquery mobile event bindings
            self.$el.on("collapsiblecollapse", function( event, ui ){
                // console.log('collapse');
            });

            self.$el.on( "collapsibleexpand", function( event, ui ){

                data = $(event.target).find('.ajax-hl').data();

                self.routeToCanvas(data.canvastype);

            });

            return self;
        }
    });

    return CanvasListView;
});