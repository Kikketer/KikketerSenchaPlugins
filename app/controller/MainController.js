/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.controller.MainController', {
  extend: 'Ext.app.Controller',

  requires: [
    'KikketerPlugins.view.ButtonsNavigationView',
    'KikketerPlugins.view.IosSelectView',
    'KikketerPlugins.view.PluginSelect'
  ],

  config: {
    refs: {
      PluginSelect: {autoCreate: true, xtype: 'pluginselect', selector: 'pluginselect'},
      ButtonsNavView: {autoCreate: true, xtype: 'buttonsnavigationview', selector: 'buttonsnavigationview'},
      IosSelectView: {autoCreate: true, xtype: 'iosselectview', selector: 'iosselectview'}
    },
    control: {
      PluginSelect: {
        pluginSelected: 'onPluginSelected'
      }
    }
  },

  onPluginSelected: function(plugin) {
    // Ignore the odd ties I'm using with the view and controller, I got lazy with the "if" checks
    Ext.Viewport.animateActiveItem(this.getRefs()[plugin.get('view')], {type: 'slide', direction: 'left', duration: 300});
  }
});