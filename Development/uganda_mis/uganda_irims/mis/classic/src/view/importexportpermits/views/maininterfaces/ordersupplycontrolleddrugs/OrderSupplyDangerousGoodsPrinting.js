/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.ordersupplycontrolleddrugs.OrderSupplyDangerousGoodsPrinting', {
  extend: 'Ext.panel.Panel',
  xtype: 'ordersupplydangerousgoodsprinting', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'ordersupplydangerousgoodsprintingpnl'
      }
  ]
});