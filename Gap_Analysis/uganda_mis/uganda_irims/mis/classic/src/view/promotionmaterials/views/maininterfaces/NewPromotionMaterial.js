Ext.define('Admin.view.promotionmaterials.views.maininterfaces.NewPromotionMaterial', {
    extend: 'Ext.panel.Panel',
    xtype: 'newpromotionmaterial',
    controller: 'promotionmaterialviewcontroller',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'newpromotionmaterialwizard'
        }
    ]
});