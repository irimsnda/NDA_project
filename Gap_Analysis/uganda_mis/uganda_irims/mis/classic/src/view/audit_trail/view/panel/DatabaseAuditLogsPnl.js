Ext.define('Admin.view.audit_report.views.panels.DatabaseAuditLogsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'databaseauditlogs',
    title: 'Database Logs Report',
    controller: 'audit_trialViewCtr',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    tbar: [{
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 0,
    }],

   listeners: {
        beforerender: 'loadApplicationReport'
        },

    items: [],

});
