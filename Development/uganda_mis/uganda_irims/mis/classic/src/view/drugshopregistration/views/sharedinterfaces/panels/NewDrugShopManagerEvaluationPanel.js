
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.NewDrugShopManagerEvaluationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newdrugshopmanagerevaluationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'drugshopmanagerevaluationgrid'
        }
    ]
});