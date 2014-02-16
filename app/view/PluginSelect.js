Ext.define('KikketerPlugins.view.PluginSelect', {
  extend: 'Ext.Container',
  xtype: 'pluginselect',
  selector: 'pluginselect',

  requires: [
    'KikketerPlugins.view.components.IosSelectField'
  ],

  config: {
    styleHtmlContent: true,
    layout: 'vbox',

    items: [
      {
        xtype: 'container',
        cls: 'innerContent',
        html: '<p>This is the test application for all the plugins created by Chris Weed and Kevin McDonald.</p><p>' +
          'If you have any questions or possible updates, please add a pull request to the git repository.</p>'
      },
      {
        xtype: 'list',
        itemId: 'pluginlist',
        itemCls: 'navlist-item',
        flex: 1,
        style: 'margin-top: 15px',
        itemTpl: '{title}',
        data: [
          {title: 'Navigation View', view: 'ButtonsNavView'},
          {title: 'iOS7 Select Box (No Navbar)', view: 'IosSelectView'}
        ]
      }
    ],

    listeners: [
      {
        fn: 'onPluginSelect',
        event: 'select',
        delegate: '#pluginlist'
      }
    ]
  },

  onPluginSelect: function(self, record) {
    var me = this;
    setTimeout(function() {
      me.down('#pluginlist').deselectAll();
    }, 100);
    this.fireEvent('pluginSelected', record);
  }
});
