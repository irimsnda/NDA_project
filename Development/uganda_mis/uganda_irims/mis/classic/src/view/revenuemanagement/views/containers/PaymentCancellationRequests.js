
Ext.define('Admin.view.revenuemanagement.views.containers.PaymentCancellationRequests', {
  extend: 'Ext.Container',
  xtype: 'paymentcancellationrequests',
  controller: 'revenuemanagementvctr',
  layout: 'border',
  items: [{
          xtype: 'paymentcancellationrequestsdashwrapper',//drugsproductRegDashWrapper
          region: 'center'
      },
      {
          xtype: 'paymentcancellationrequeststb',
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