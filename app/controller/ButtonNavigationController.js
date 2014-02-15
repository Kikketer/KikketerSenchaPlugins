/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.controller.ButtonNavigationController', {
  extend: 'Ext.app.Controller',

  requires: [
    'KikketerPlugins.view.ButtonsNavigationView',
    'KikketerPlugins.view.ButtonNavView',
    'KikketerPlugins.view.SecondButtonNavView'
  ],

  config: {
    refs: {
      ButtonsNavigationView: {autoCreate: true, xtype: 'buttonsnavigationview', selector: 'buttonsnavigationview'},
      ButtonNavView: {autoCreate: true, xtype: 'buttonnavview', selector: 'buttonnavview'},
      SecondButtonNavView: {autoCreate: true, xtype: 'secondbuttonnavview', selector: 'secondbuttonnavview'}
    },

    control: {
      ButtonNavView: {
        rightTapped: 'onRightTap',
        leftTapped: 'onLeftTap'
      }
    }
  },

  onLeftTap: function() {
    // I really wish I could find reasonable documentation on the animate active item...
    Ext.Viewport.getLayout().setAnimation({type: 'slide', direction: 'right', duration: 300});
    Ext.Viewport.remove(this.getButtonsNavigationView());
  },

  onRightTap: function() {
    this.getButtonsNavigationView().push(this.getSecondButtonNavView());
  }
});