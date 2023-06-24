
Ext.define('Admin.view.revenuemanagement.views.containers.BatchApplicationInvoices', {
  extend: 'Ext.Container',
  xtype: 'batchapplicationinvoices',
  controller: 'revenuemanagementvctr',
  layout: 'border',
  items: [{
          xtype: 'batchapplicationinvoicesdashwrapper',//drugsproductRegDashWrapper
          region: 'center'
      },
      {
          xtype: 'batchapplicationinvoicestb',
          region: 'south'
      }, {
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 16
    },
    {
        xtype: 'hiddenfield',
        name: 'sub_module_id',
        value: 43
    }
  ]
});