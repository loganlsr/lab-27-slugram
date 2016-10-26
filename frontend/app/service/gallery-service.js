'use strict';

module.exports = ['$q', '$log', '$http', 'authService', GalleryService];

function GalleryService($q, $log, $http, authService){
  $log.debug('init GalleryService');
  let service = {};
  service.galleries = [];

  service.createGallery = function(gallery){
    $log.debug('GalleryService.createGallery()');

    return authService.getToken()
    .then ( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.post(url, gallery, config);
    })
    .then ( res => {
      $log.log('successful create gallery');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch ( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchGalleries = function(){
    $log.debug('galleryService.getToken()');
    return authService.getToken()
    .then ( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('successful fetch of user galleries');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateGalleries = function(){
    return authService.getToken()
    .then ( token => {
      let url = `${__API_URL__}/api/gallery/${gallery._id}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.put(url, config);
    })
    .then( res => {
      $log.log('successful update of user gallery');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGalleries = function(){
    return authService.getToken()
    .then ( token => {
      let url = `${__API_URL__}/api/gallery/${gallery._id}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('successful update of user gallery');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
