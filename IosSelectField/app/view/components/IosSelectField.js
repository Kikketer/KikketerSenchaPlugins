/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.view.components.IosSelectField', {
  extend: 'Ext.dataview.component.ListItem',
  xtype: 'iosselectfield',
  selector: 'iosselectfield',

  config: {
    cls: 'x-field navlist-item iosSelectField',
    layout: 'hbox',
    itemId: 'selectField',
    items: [
      {
        xtype: 'container',
        cls: 'x-form-label iosSelectLabel',
        html: '<span>Label</span>'
      },
      {
        xtype: 'container',
        cls: 'iosSelectText',
        itemId: 'selectedValue',
        align: 'right',
        tpl: '{name}'
      }
    ]
  },

  store: null,
  currentSelection: null,
  defaultSelection: null,
  tapTimer: null,
  doubleTapTimer: 3000,

  setStore: function(store) {
    this.store = store;
  },

  setData: function(data) {
    this.store = new Ext.data.Store({
      data: data
    });
  },

  setDefaultValue: function(value) {
    Ext.Logger.verbose('setDefault');
    this.defaultSelection = value;
    this.setValue(this.defaultSelection);
  },

  getDefaultValue: function() {
    return this.defaultSelection;
  },

  setValue: function(value) {
    if (this.store && Ext.isSimpleObject(value)) {
      var key = Ext.Object.getKeys(value)[0];
      this.currentSelection = this.store.findRecord(key, value[key]);
      this.down('#selectedValue').setData(this.currentSelection.data);
    }
    else if (this.store && Ext.isNumber(value)) {
      // If the value passed in is an index
      this.currentSelection = this.store.getAt(value);
      this.down('#selectedValue').setData(this.currentSelection.data);
    }
  },

  reset: function() {
    this.setValue(this.getDefaultSelection());
  },

  getStore: function() {
    return this.store;
  },

  getValue: function() {
    return this.currentSelection;
  },

  setTpl: function(template) {
    this.down('#selectedValue').setTpl(template);
  },

  getTpl: function() {
    return this.down('#selectedValue').getTpl();
  },

  onSelect: function() {
    // For slower devices we need to make sure we don't double tap
    var navView = this.up('navigationview');
    if(this.tapTimer) {
      var diff = new Date().getTime() - this.tapTimer.getTime();
      if(diff > this.doubleTapTimer) {
        this.tapTimer = new Date();
        this.fireEvent('selectionBoxTapped', this, navView, this.store, this.currentSelection);
      }
    }
    else {
      this.tapTimer = new Date();
      this.fireEvent('selectionBoxTapped', this, navView, this.store, this.currentSelection);
    }
  },

  initialize: function() {
    this.element.on('tap', this.onSelect, this);

    this.down('container').setHtml('<span>' + this.config.label + '</span>');

    if (this.config.tpl) {
      this.down('#selectedValue').setTpl(this.config.tpl);
    }

    if (this.config.data) {
      this.setData(this.config.data);
    }

    if (this.config.value) {
      this.setValue(this.config.value);
      this.setDefaultValue(this.config.value);
    }

    if (this.config.doubleTapTimer) {
      this.doubleTapTimer = this.config.doubleTapTimer;
    }

  }
});