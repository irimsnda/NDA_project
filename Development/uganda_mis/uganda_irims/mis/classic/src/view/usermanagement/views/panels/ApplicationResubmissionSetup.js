Ext.define('Admin.view.usermanagement.views.panels.ApplicationResubmissionSetup', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationresubmissionsetup',
    title: 'Application Resubmission',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'applicationresubmissionsetupGrid'
        }
    ]
});