Ext.define('Admin.view.promotionmaterials.views.containers.PromotionAdvertCosmeticWrapper', {
    extend: 'Ext.Container',
    xtype: 'promotionadvertcosmeticwrapper',
	itemId:'promotionadvertcosmeticwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'promoadvertcosmeticdashboard'
        }
    ]
});