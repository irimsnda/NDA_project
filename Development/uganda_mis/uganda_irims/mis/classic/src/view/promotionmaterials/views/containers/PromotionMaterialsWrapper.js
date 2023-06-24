Ext.define('Admin.view.promotionmaterials.views.containers.PromotionMaterialsWrapper', {
    extend: 'Ext.Container',
    xtype: 'promotionmaterialswrapper',
	itemId:'promotionmaterialswrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'promomaterdashboard'
        }
    ]
});