

/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.CommonName', {
  extend: 'Ext.container.Container',
  xtype: 'commonName',
  layout: 'responsivecolumn',
  controller: 'configurationsvctr',
  viewModel: 'configurationsvm',
  items: [
      {
          xtype: 'commonNamePnl'
      }
  ]
});
