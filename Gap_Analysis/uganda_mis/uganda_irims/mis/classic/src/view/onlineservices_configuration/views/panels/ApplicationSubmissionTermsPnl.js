/**
 * Created by Softclans on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.panels.ApplicationSubmissionTermsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationsubmissiontermspnl',
    title: 'Application Terms & Conditions',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'applicationsubmissiontermsgrid'
        }
    ]
});
