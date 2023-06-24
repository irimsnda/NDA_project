/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.RegistrationTimeSpantypePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'registrationtimespantypepnl',
    title: 'Registration Time Span Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'registrationtimespantypegrid'
        }
    ]
});
