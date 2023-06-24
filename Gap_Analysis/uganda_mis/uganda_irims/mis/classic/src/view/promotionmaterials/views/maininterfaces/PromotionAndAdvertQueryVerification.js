/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.promotionmaterials.views.maininterfaces.PromotionAndAdvertQueryVerification', {
  extend: 'Ext.panel.Panel',
  xtype: 'promotionandadvertqueryverification', 
  controller: 'promotionmaterialviewcontroller',
  viewModel: {
      type: 'promotionmaterialsviewmodel'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'promotionandadvertverificationpnl'
      }
  ]
});