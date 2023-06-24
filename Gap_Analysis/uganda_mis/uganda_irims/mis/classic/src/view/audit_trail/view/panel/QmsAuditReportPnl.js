Ext.define('Admin.view.audit_trail.views.panels.QmsAuditReportPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'qmsauditreportpnl',
    title: 'Qms Audit Trail Report',
    controller: 'audit_trialViewCtr',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    tbar: [{
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 8,
    }],

   listeners: {
        beforerender: 'loadApplicationReport'
        },

    items: [],

});
