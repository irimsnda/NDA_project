
Ext.define('Admin.view.revenuemanagement.views.containers.AdhocInvoicingProcess', {
  extend: 'Ext.Container',
  xtype: 'adhocinvoicingprocess',
  controller: 'revenuemanagementvctr',
  layout: 'border',
  items: [{
          xtype: 'adhocinvoicingprocessdashwrapper',//drugsproductRegDashWrapper
          region: 'center'
      },
      {
          xtype: 'adhocinvoicingprocesstb',
          region: 'south'
      }, {
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 17
    }]
});