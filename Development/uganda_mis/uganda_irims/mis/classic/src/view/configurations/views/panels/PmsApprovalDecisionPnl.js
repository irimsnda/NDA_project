Ext.define('Admin.view.configurations.views.panels.PmsApprovalDecisionPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pmsapprovaldecision',
    title: 'PMS Approval Decisions',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'pmsapprovaldecisionGrid'
        }
    ]
});