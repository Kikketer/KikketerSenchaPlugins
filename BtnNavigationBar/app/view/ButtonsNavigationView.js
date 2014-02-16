/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.view.ButtonsNavigationView', {
  extend: 'KikketerPlugins.view.components.NavView',
  xtype: 'buttonsnavigationview',
  selector: 'buttonsnavigationview',

  requires: [
    'KikketerPlugins.util.Helpers',
    'KikketerPlugins.view.FirstPageView'
  ],

  // With normal Navigation View, we would have to set the buttons here.
  // We would then have to have a pile of logic to show the correct buttons based on the current view

  // Instead, with the BtnNavigationBar, we can have the button logic and definition inside the views

  config: {
    items: [
      {
        xtype: 'firstpageview'
      }
    ]
  }
});