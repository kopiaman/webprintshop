angular.module('app').factory('ApiService', function( ) {

  return {
    baseUrl: function(url) {
        return "../";
    },    
    Url: function(url) {
      return this.baseUrl() + "api/" + url;
    },    
    fontUrl: function(url) {
      return this.baseUrl() + "data/" + url;
    },
    imageUrl: function(data) {
      return this.baseUrl() + "api/image.php?" + $.param( data );
    },    
    imageTransparentUrl: function(data) {
      return this.baseUrl() + "api/image_transparent.php?" + $.param( data );
    },
    uploadURL: function(src) {
      return this.baseUrl() + "storage/uploads/" + src;
    }
  };
  
});