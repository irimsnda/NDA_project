Ext.define('Admin.view.audit_trail.views.panels.GmpApplicationAuditReportPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'gmpapplicationauditreportpnl',
    title: 'Gmp Application Audit Trail Report',
    controller: 'audit_trialViewCtr',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    tbar: [{
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 3,
    }],

   listeners: {
        beforerender: 'loadApplicationReport'
        },

    items: [],

});
