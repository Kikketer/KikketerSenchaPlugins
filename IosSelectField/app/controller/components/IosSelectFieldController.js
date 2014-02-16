/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.controller.components.IosSelectFieldController', {
  extend: 'Ext.app.Controller',

  requires: [
    'Ext.data.Store',
    'KikketerPlugins.view.components.IosSelectField'
  ],

  config: {
    refs: {
      SelectField: {autoCreate: true, xtype: 'iosselectfield', selector: 'iosselectfield'}
    },

    control: {
      SelectField: {
        selectionBoxTapped: 'onSelectionTapped',
        reset: 'onReset'
      }
    }
  },

  onReset: function(options) {
    options.ref.setValue(options.ref.getDefaultSelection());
  },

  onSelectionTapped: function(selectItem, navigationView, store, selection) {
    Ext.Logger.verbose("Selection field tapped, showing list...");
    var lst = Ext.create('Ext.dataview.List', {
      itemTpl: selectItem.getTpl().html,
      store: store,
      infinite: true,
      variableHeights: true
    });

    // Suppress the select event (but select the current one)
    lst.select(selection, false, true);

    // We may not have a navigation view to use, check for it and make one if need be
    if (!navigationView) {
      var originalItem = Ext.Viewport.getActiveItem();
      var selContainer = Ext.create('Ext.Container', {
        layout: 'fit',
        items: [
          {
            xtype: 'toolbar',
            docked: 'top',
            items: [
              {
                xtype: 'button',
                itemId: 'bkBtn',
                ui: 'back',
                text: 'Back'
              }
            ],
            listeners: [
              {
                fn: function() {
                  Ext.Viewport.animateActiveItem(originalItem, {type: 'slide', direction: 'right', duration: 300});
                },
                event: 'tap',
                delegate: '#bkBtn'
              }
            ]
          }
        ]
      });
      selContainer.add(lst);

      lst.on('itemtap', this.onSelectionChanged, selectItem, {container: selContainer});
      Ext.Viewport.animateActiveItem(selContainer, {type: 'slide', direction: 'left', duration: 300});
    }
    else {
      // Register a listener for the list
      lst.on('itemtap', this.onSelectionChanged, selectItem, {nav: navigationView});
      navigationView.push(lst);
    }
  },

  onSelectionChanged: function(x, selectionIndex) {
    this.setValue(selectionIndex);
    this.fireEvent('itemSelected', arguments[3]);
  }

});