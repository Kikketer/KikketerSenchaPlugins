/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.view.FirstPageView', {
  extend: 'Ext.Container',
  xtype: 'firstpageview',
  selector: 'firstpageview',

  config: {
    title: 'Button Navs',
    styleHtmlContent: true,
    html: '<p>Here\'s the better navigation view</p><p>The top two buttons are dictated and listened for in the ' +
      'internal view.</p><p>' +
      'The "back" button on the upper left is hand written in this case, but normally you would want to do that ' +
      'with the standard navigation view features.</p>',
    navBarButtons: {
      leftButton: {
        text: 'Left'
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
    this.setHtml('Left button tapped.');
    // You can do any logic and fire the event upward to the controllers:
    this.fireEvent('leftTapped');
  },

  onRightTap: function() {
    // From this point you can fire an event to it's controller:
    this.fireEvent('rightTapped');
  }
});