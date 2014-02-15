/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.controller.components.NavController', {
  extend: 'Ext.app.Controller',

  requires: [
    'KikketerPlugins.view.components.NavView'
  ],

  config: {
    refs: {
      NavView: {autoCreate: true, xtype: 'navview', selector: 'navview'}
    },
    control: {
      NavView: {
        leftButtonTapped: 'onLeftButtonTap',
        rightButtonTapped: 'onRightButtonTap',
        popped: 'onPop',
        pushed: 'onPush',
        init: 'onInit'
      }
    }
  },

  onLeftButtonTap: function (obj, caller, partOfViewport) {
    var currentNavView = Ext.ComponentQuery.query(caller.connectingController.info.target)[0];
    var currentView = currentNavView.getActiveItem();

    if (currentView.config.navBarButtons.leftButton) {
      currentView.fireEvent('onLeftNavButtonTapped');
    }
  },

  onRightButtonTap: function (obj, caller) {
    var currentNavView = Ext.ComponentQuery.query(caller.connectingController.info.target)[0];
    var currentView = currentNavView.getActiveItem();

    if (currentView.config.navBarButtons.rightButton) {
      currentView.fireEvent('onRightNavButtonTapped');
    }
  },

  // function to determine which buttons to show in the NavView, as well as populate text and actions
  populateNavButtons: function (currentView, t) {
    this.addNavButtons(t);
  },

  addNavButtons: function (navView, viewToLook) {
    var rightButtonDefaults = {
      align: 'right',
      itemId: 'right_action_button',
      text: 'Right',
      ui: 'action'
    };
    var leftButtonDefaults = {
      align: 'left',
      itemId: 'left_action_button',
      text: 'Left',
      ui: 'action'
    };
    var pushedView;
    if (viewToLook.config) {
      pushedView = viewToLook;
    } else {
      pushedView = viewToLook.originatingView;
    }

    // show new buttons
    if (navView) {
      var navBar = navView.getNavigationBar();

      if (pushedView.config.navBarButtons && pushedView.config.navBarButtons.rightButton) {
        var rightButton = Ext.create("Ext.Button", KikketerPlugins.util.Helpers.merge(true, rightButtonDefaults, pushedView.config.navBarButtons.rightButton));
        navBar.add(rightButton);
      }

      if (pushedView.config.navBarButtons && pushedView.config.navBarButtons.leftButton) {
        var leftButton = Ext.create("Ext.Button", KikketerPlugins.util.Helpers.merge(true, leftButtonDefaults, pushedView.config.navBarButtons.leftButton));
        navBar.add(leftButton);
      }

    }
  },

  removeNavButtons: function (navView) {
    // clean up old buttons
    if (navView) {
      var bar = navView.getNavigationBar();
      var rightButton = Ext.ComponentQuery.query("#right_action_button", navView)[0];
      if (rightButton) {
        bar.remove(rightButton, true);
      }

      var leftButton = Ext.ComponentQuery.query("#left_action_button", navView)[0];
      if (leftButton) {
        bar.remove(leftButton, true);
      }
    }
  },

  onInit: function (child) {
    this.addNavButtons(child.getParent(), child);
  },

  onPop: function (self, popped) {
    this.removeNavButtons(popped.getParent());
    this.addNavButtons(popped.getParent(), popped);
  },

  onPush: function (self, pushed) {
    this.removeNavButtons(pushed.getParent());
    this.addNavButtons(pushed.getParent(), pushed);
  }

});