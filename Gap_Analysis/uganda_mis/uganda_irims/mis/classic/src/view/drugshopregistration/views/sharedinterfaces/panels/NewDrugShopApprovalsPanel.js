
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.NewDrugShopApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newdrugshopapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'drugshopapprovalsgrid'
        }
    ]
});