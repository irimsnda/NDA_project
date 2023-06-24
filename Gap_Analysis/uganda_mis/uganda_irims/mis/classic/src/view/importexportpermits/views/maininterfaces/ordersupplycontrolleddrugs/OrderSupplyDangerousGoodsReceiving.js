/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.ordersupplycontrolleddrugs.OrderSupplyDangerousGoodsReceiving', {
  extend: 'Ext.panel.Panel',
  xtype: 'ordersupplydangerousgoodsreceiving',
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'ordersupplydangerousgoodsreceivingwizard'//controlleddrugsreceivingpermitswizard
      }
  ]
});