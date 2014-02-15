/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.view.components.NavView', {
  extend: 'Ext.navigation.View',
  xtype: 'navview',
  selector: 'navview',

  config: {
    useTitleForBackButtonText: true,
    autoDestory: false,
    listeners: [
      {
        fn: 'onPush',
        event: 'push'
      },
      {
        fn: 'onPop',
        event: 'pop'
      },
      {
        fn: 'onLeftButtonAction',
        event: 'tap',
        delegate: '#left_action_button'
      },
      {
        fn: 'onRightButtonAction',
        event: 'tap',
        delegate: '#right_action_button'
      }
    ]
  },
  onPush: function() {
    this.fireEvent('pushed', arguments[0], arguments[1]);
  },

  onPop: function() {
    var topOfStack = this.items.getAt(this.items.keys.length - 1);
    if(this.items.keys.length <= 2) {
      topOfStack = this.items.getAt(0);
    }
    this.fireEvent('popped', this, topOfStack);
  },

  onLeftButtonAction: function (button) {
    Ext.Logger.verbose("on left button action");
    this.fireEvent("leftButtonTapped");
  },

  onRightButtonAction: function (button) {
    Ext.Logger.verbose("on right button action with action: " + button.config.action);
    this.fireEvent("rightButtonTapped");
  },

  setup: function() {
    // Any post initialize setup that we need to do
  },

  initialize: function() {
    this.fireEvent('init', this.items.getAt(0));
    this.callParent();
  }
});