Ext.define('Admin.view.promotionmaterials.views.maininterfaces.RenewalPromotionMaterial', {
    extend: 'Ext.panel.Panel',
    xtype: 'renewalpromotionmaterial',
    controller: 'promotionmaterialviewcontroller',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'renewalpromotionmaterialwizard'
        }
    ]
});