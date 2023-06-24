Ext.define('Admin.view.promotionmaterials.views.maininterfaces.AmmendmentPromotionMaterial', {
    extend: 'Ext.panel.Panel',
    xtype: 'ammendmentpromotionmaterial',
    controller: 'promotionmaterialviewcontroller',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'ammendmentpromotionmaterialwizard'
        }
    ]
});