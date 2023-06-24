Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.PromotionAndAdvertApprovalsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'promotionandadvertapprovalspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'promotionandadvertapprovalsgrid'//'approvalsgrid'
        }
    ]
});