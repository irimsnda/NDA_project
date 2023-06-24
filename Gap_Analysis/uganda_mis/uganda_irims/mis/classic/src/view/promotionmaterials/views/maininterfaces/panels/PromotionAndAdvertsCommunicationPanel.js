Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.PromotionAndAdvertsCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'promotionandadvertscommunicationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'promotionandadvertscommunicationsgrid'
        }
    ]
});