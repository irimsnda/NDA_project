
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.NewDrugShopCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newdrugshopcommunicationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'drugshopcommunicationsgrid'
        }
    ]
});