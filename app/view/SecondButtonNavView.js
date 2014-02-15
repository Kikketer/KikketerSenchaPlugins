/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.view.SecondButtonNavView', {
  extend: 'Ext.Container',
  xtype: 'secondbuttonnavview',
  selector: 'secondbuttonnavview',

  config: {
    title: 'Second',
    cls: 'innerContent',
    html: '<p>This is the second pushed page, the buttons are cleared and reset.</p><p>' +
      'The upper left button is handed to us automatically by the navigation view.</p><p>' +
      'You are able to set any other navigation buttons in the view itself, removing the "what should be shown"' +
      ' type logic from the navigation view</p>'
  }
});