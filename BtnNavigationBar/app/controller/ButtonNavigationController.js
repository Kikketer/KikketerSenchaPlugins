/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.controller.ButtonNavigationController', {
  extend: 'Ext.app.Controller',

  requires: [
    'KikketerPlugins.view.ButtonsNavigationView',
    'KikketerPlugins.view.FirstPageView',
    'KikketerPlugins.view.SecondPageView'
  ],

  config: {
    refs: {
      ButtonsNavigationView: {autoCreate: true, xtype: 'buttonsnavigationview', selector: 'buttonsnavigationview'},
      FirstPageView: {autoCreate: true, xtype: 'firstpageview', selector: 'firstpageview'},
      SecondPageView: {autoCreate: true, xtype: 'secondpageview', selector: 'secondpageview'}
    },

    control: {
      FirstPageView: {
        rightTapped: 'onRightTap',
        leftTapped: 'onLeftTap'
      }
    }
  },

  onLeftTap: function() {
    // Some kind of logic here for the left button
    // For now we don't have anything here
  },

  onRightTap: function() {
    this.getButtonsNavigationView().push(this.getSecondPageView());
  }
});