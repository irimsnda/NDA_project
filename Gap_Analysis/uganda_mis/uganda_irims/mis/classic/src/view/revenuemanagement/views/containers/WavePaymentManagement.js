
Ext.define('Admin.view.revenuemanagement.views.containers.WavePaymentManagement', {
  extend: 'Ext.Container',
  xtype: 'wavepaymentmanagement',
  controller: 'revenuemanagementvctr',
  layout: 'border',
  items: [{
          xtype: 'wavepaymentmanagementdashwrapper',//drugsproductRegDashWrapper
          region: 'center'
      },
      {
          xtype: 'wavepaymentmanagementtb',
          region: 'south'
      }, {
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 16
    },
    {
        xtype: 'hiddenfield',
        name: 'sub_module_id',
        value: 44
    }
  ]
});