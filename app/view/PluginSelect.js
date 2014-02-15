Ext.define('KikketerPlugins.view.PluginSelect', {
  extend: 'Ext.Container',
  xtype: 'pluginselect',
  selector: 'pluginselect',

  config: {
    styleHtmlContent: true,
    layout: 'vbox',

    items: [
      {
        xtype: 'container',
        cls: 'header',
        html: 'This is the test application for all the plugins created by Chris Weed and Kevin McDonald.<br /><br />' +
          'If you have any questions or possible updates, please add a pull request to the git repository.'
      },
      {
        xtype: 'list',
        itemId: 'pluginlist',
        itemCls: 'navlist-item',
        flex: 1,
        style: 'margin-top: 15px',
        itemTpl: '{title}',
        data: [
          {title: 'Navigation View', view: 'btnnavview'},
          {title: 'iOS7 Select Box', view: 'iosselect'}
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

  onPluginSelect: function(self, index, target, record, e, eOpts) {
    var me = this;
    setTimeout(function() {
      me.down('#pluginlist').deselectAll();
    }, 100);
    this.fireEvent('pluginSelected', record);
  }
});
