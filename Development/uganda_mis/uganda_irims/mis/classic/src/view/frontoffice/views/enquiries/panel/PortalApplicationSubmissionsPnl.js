Ext.define('Admin.view.frontoffice.views.enquiries.panel.PortalApplicationSubmissionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalapplicationsubmissions',
    title: 'Portal Applications Submission',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'portalapplicationsubmissionsGrid'
        }
    ]
});