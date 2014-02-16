/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2014 Liberty Mutual Insurance
 */

Ext.define('KikketerPlugins.view.IosSelectView', {
  extend: 'Ext.form.Panel',
  xtype: 'iosselectview',
  selector: 'iosselectview',

  requires: [
    'KikketerPlugins.view.components.IosSelectField'
  ],

  config: {
    items: [
      {
        xtype: 'container',
        cls: 'innerContent',
        styleHtmlContent: true,
        html: '<p>This exmaple shows the iOS7 style select box but using it without an overarching Navigation View.</p>' +
          '<p>You may also simply have this wrapped in a Navigation view, it\'ll use the built in push/pop logic of that view.</p>'
      },
      {
        xtype: 'fieldset',
        items: [
          {
            xtype: 'iosselectfield',
            itemId: 'fieldOne',
            label: 'Select Field A',
            tpl: '{label}'
          },
          {
            xtype: 'iosselectfield',
            itemId: 'fieldTwo',
            label: 'Select Field B',
            tpl: '{name}',
            value: {name: 'selectA'},
            data: [
              {name: 'selectA', value: 1},
              {name: 'selectB', value: 2},
              {name: 'selectC', value: 3}
            ]
          }
        ]
      }
    ]
  },

  initialize: function() {
    // The data/store and value can be set after the fact
    // Be sure to set a default as well if you wish to use the reset() function
    this.down('#fieldOne').setData([
      {label: 'Option A', someId: 1},
      {label: 'Option B', someId: 2}
    ]);
    this.down('#fieldOne').setDefaultValue({someId: 2});
    this.down('#fieldOne').setValue({someId: 2});
  }
});