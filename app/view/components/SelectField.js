/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.view.components.SelectField', {
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

  setStore: function(store) {
    this.store = store;
  },

  setData: function(data) {
    this.store = new Ext.data.Store({
      data: data
    });
  },

  setDefaultSelection: function(value) {
    Ext.Logger.verbose('setDefault');
    this.defaultSelection = value;
    this.setValue(this.defaultSelection);
  },

  getDefaultSelection: function() {
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

//    if (!this.initialValue){
//      this.setValue(this.currentSelection);
//    }
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
    var navView = this.up('navigationview');
    this.fireEvent('selectionBoxTapped', this, navView, this.store, this.currentSelection);
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
      this.setDefaultSelection(this.config.value);
    }

//    this.initialSelection = this.getValue();
  }
});