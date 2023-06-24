
Ext.define('Admin.view.revenuemanagement.views.containers.InvoiceCancellation', {
  extend: 'Ext.Container',
  xtype: 'invoicecancellation',
  controller: 'revenuemanagementvctr',
  layout: 'border',
  items: [{
          xtype: 'invoicecancellationdashwrapper',//drugsproductRegDashWrapper
          region: 'center'
      },
      {
          xtype: 'invoicecancellationtb',
          region: 'south'
      }, {
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 16
    },
    {
        xtype: 'hiddenfield',
        name: 'sub_module_id',
        value: 42
    }
  ]
});