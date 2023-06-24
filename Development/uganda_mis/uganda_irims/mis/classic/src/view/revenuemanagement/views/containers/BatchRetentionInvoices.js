
Ext.define('Admin.view.revenuemanagement.views.containers.BatchRetentionInvoices', {
  extend: 'Ext.Container',
  xtype: 'batchretentioninvoices',
  controller: 'revenuemanagementvctr',
  layout: 'border',
  items: [{
          xtype: 'batchretentioninvoicesdashwrapper',//drugsproductRegDashWrapper
          region: 'center'
      },
      {
          xtype: 'batchretentioninvoicestb',
          region: 'south'
      }, {
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 16
    },
    {
        xtype: 'hiddenfield',
        name: 'sub_module_id',
        value: 63
    }
  ]
});