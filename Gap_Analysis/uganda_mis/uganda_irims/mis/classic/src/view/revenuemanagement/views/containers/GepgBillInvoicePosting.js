Ext.define('Admin.view.revenuemanagement.views.containers.GepgBillInvoicePosting', {
  extend: 'Ext.Container',
  xtype: 'gepgbillinvoiceposting',
  controller: 'revenuemanagementvctr',
  layout: 'fit',
  items: [
      {
          xtype: 'gepgbillinvoicepostingpnl'
      }
  ]
});