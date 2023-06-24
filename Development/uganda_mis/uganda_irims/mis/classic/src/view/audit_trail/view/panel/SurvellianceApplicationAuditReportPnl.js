Ext.define('Admin.view.audit_trail.views.panels.SurvellianceApplicationAuditReportPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'survellianceapplicationauditreportpnl',
    title: 'Survelliance Application Audit Trail Report',
    controller: 'audit_trialViewCtr',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    tbar: [{
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 5,
    }],

   listeners: {
        beforerender: 'loadApplicationReport'
        },

    items: [],

});
