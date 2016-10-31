'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootscope', 'galleryService', HomeController];

function HomeController($log, $rootscope, galleryService){
  $log.debug('init homeCtrl');
  this.galleries = {};

  this.fetchGalleries = function(){
    galleryService.fetchGalleries()
   .then( galleries => {
     this.galleries = galleries;
     this.currentGallery = galleries[0];
   });
  };

  this.galleryDeleteDone = function(gallery){
    $log.debug('homeCtrl.galleryDeleteDone()');
    if (this.currentGallery._id === gallery._id){
      this.currentGallery = null;
    }
  };

  this.fetchGalleries();

  $rootscope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });
}
