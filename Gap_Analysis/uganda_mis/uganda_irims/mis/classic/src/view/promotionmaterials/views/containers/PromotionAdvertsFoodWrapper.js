Ext.define('Admin.view.promotionmaterials.views.containers.PromotionAdvertsFoodWrapper', {
    extend:'Ext.Container',
	xtype:'promotionadvertsfoodwrapper',
	itemId:'promotionadvertsfoodwrapper',
    layout: 'fit',
    items: [
        {
            xtype:'promoadvertfooddashboard'
        }
    ]
});