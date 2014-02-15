/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.view.ButtonNavView', {
  extend: 'Ext.Container',
  xtype: 'buttonnavview',
  selector: 'buttonnavview',

  config: {
    title: 'Button Navs',
    html: 'Here\'s the better navigation view',
    navBarButtons: {
      leftButton: {
        text: 'Back'
      },
      rightButton: {
        text: 'Right'
      }
    },

    listeners: [
      {
        fn: 'onLeftTap',
        event: 'onLeftNavButtonTapped'
      },
      {
        fn: 'onRightTap',
        event: 'onRightNavButtonTapped'
      }
    ]
  },

  onLeftTap: function() {
    // I realize I could get this button automatically with a standard nav view, but this is an example
    // You can do any logic and fire the event upward to the controllers:
    this.fireEvent('leftTapped');
  },

  onRightTap: function() {
    // From this point you can fire an event to it's controller:
    this.fireEvent('rightTapped');
  }
});