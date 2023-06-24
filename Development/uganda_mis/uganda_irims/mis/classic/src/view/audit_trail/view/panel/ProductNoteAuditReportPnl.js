Ext.define('Admin.view.audit_trail.views.panels.ProductNoteAuditReportPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'productnoteauditreportpnl',
    title: 'Product Notification Audit Trail Report',
    controller: 'audit_trialViewCtr',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    tbar: [{
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 6,
    }],

   listeners: {
        beforerender: 'loadApplicationReport'
        },

    items: [],

});
