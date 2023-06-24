Ext.define('Admin.view.promotionmaterials.views.containers.PromotionAdvertMedicalDevicesWrapper', {
    extend: 'Ext.Container',
    xtype: 'promotionadvertmedicaldeviceswrapper',
	itemId:'promotionadvertmedicaldeviceswrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'promoadvertmedicaldevicesdashboard'
        }
    ]
});