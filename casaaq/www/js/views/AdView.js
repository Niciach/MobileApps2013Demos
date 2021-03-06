define(["jquery", "underscore", "backbone", "handlebars", "text!templates/ad-details.html"],
    function ($, _, Backbone, Handlebars, template) {

    var AdView = Backbone.View.extend({

        events: {
          "touchend #addImage": "takeImage",
          "touchend #back": "goBack"
        },

        takeImage: function () {
          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            cameraDirection: Camera.Direction.BACK,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 400,
            saveToPhotoAlbum: false
          };
          var self = this;
          var cameraSuccess = function (imageURI) {
            self.model.set("figure", imageURI);
            self.render();
          };
          var cameraError = function (error) {
            console.log(error);
          };
          navigator.camera.getPicture(cameraSuccess, cameraError, options);
        },

        goBack: function () {
          window.history.back();
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
          $(this.el).html(this.template(this.model.toJSON()));
          return this;
        }
      });

    return AdView;

  });