Ext.define('Admin.view.revenuemanagement.views.containers.GepgPaymentsProcessing', {
  extend: 'Ext.Container',
  xtype: 'gepgpaymentsprocessing',
  controller: 'revenuemanagementvctr',
  layout: 'fit',
  items: [
      {
          xtype: 'gepgpaymentsprocessingpnl'
      }
  ]
});