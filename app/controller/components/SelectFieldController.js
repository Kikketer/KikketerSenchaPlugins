/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.controller.components.SelectFieldController', {
  extend: 'Ext.app.Controller',

  requires: [
    'KikketerPlugins.view.components.SelectField'
  ],

  config: {
    refs: {
      SelectField: {autoCreate: true, xtype: 'iosselectfield', selector: 'iosselectfield'}
    },

    control: {
      SelectField: {
        selectionBoxTapped: 'onSelectionTapped',
        reset:'onReset'
      }
    }
  },

  onReset:function(options){
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

    // Register a listener for the list
    lst.on('itemtap', this.onSelectionChanged, selectItem, {nav:navigationView});

    navigationView.push(lst);
  },

  onSelectionChanged: function(x, selectionIndex) {
    this.setValue(selectionIndex);
    this.fireEvent('itemSelected', arguments[3]);
    this.up('navview').pop();
  }

});