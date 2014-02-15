/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.util.EndpointConfig', {
  statics: {
    getEndpoint: function () {
      // Determine what the properties should be initialized to based on the URL
      var hostkey = window.location.host.toUpperCase();

      if (window.location.search.toUpperCase().indexOf('VPN') >= 0) {
        Ext.Logger.verbose('Setting up for LOCAL (local datapile) environment');
        return 'http://localhost:3001';
      }
      else if (window.location.search.toUpperCase().indexOf('SLICE') >= 0) {
        Ext.Logger.verbose('Setting up for SLICE environment');
        return 'http://p530kdc.kc.lmig.com:221';
      }
      else if (window.location.search.toUpperCase().indexOf('DATAPILE') >= 0 || hostkey.indexOf('LOCALHOST') >= 0) {
        Ext.Logger.verbose('Setting up for LOCAL (remote datapile) environment');
        return 'http://dev-datapile.pdc-np-cf.lmig.com';
      }
      else {
        return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      }
    }
  }
});