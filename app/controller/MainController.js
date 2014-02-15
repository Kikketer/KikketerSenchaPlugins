/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.controller.MainController', {
  extend: 'Ext.app.Controller',

  requires: [
    'KikketerPlugins.view.ButtonsNavigationView',
    'KikketerPlugins.view.PluginSelect'
  ],

  config: {
    refs: {
      PluginSelect: {autoCreate: true, xtype: 'pluginselect', selector: 'pluginselect'},
      ButtonsNavView: {autoCreate: true, xtype: 'buttonsnavigationview', selector: 'buttonsnavigationview'}
    },
    control: {
      PluginSelect: {
        pluginSelected: 'onPluginSelected'
      }
    }
  },

  onPluginSelected: function(plugin) {
    Ext.Viewport.add(this.getButtonsNavView());
    Ext.Viewport.getLayout().setAnimation({type: 'slide', direction: 'left', duration: 300});
    Ext.Viewport.setActiveItem(this.getButtonsNavView());
//    Ext.Viewport.push(this.getButtonsNavView());
//    Ext.Viewport.animateActiveItem(this.getButtonsNavView(), {type: 'slide', direction: 'left', duration: 300});
  }
});