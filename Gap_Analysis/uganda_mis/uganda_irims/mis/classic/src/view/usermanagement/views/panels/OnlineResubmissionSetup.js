Ext.define('Admin.view.usermanagement.views.panels.OnlineResubmissionSetup', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlineresubmissionsetup',
    title: 'Online Applications Resubmission',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'onlineresubmissionsetupGrid'
        }
    ]
});