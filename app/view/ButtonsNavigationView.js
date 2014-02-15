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
    'KikketerPlugins.view.ButtonNavView'
  ],

  config: {
    items: [
      {
        xtype: 'buttonnavview',
        itemId: 'innerContainer'
      }
    ]
  }
});