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
        xtype: 'toolbar',
        docked: 'top',
        items: [
          {
            xtype: 'button',
            itemId: 'btnBk',
            ui: 'back',
            text: 'Back',
            listeners: [
              {
                fn: function() {
                  Ext.Viewport.animateActiveItem({xtype: 'pluginselect'}, {type: 'slide', direction: 'right', duration: 300});
                },
                event: 'tap'
              }
            ]
          }
        ]
      },
      {
        xtype: 'container',
        cls: 'innerContent',
        styleHtmlContent: true,
        html: 'This exmaple shows the iOS7 style select box but using it without an overarching Navigation View.'
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
  }
});