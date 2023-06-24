/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.RegistrationExpirytime_SpanPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'registrationexpirytime_spanpnl',
    title: 'Registration Time Span Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'registrationexpirytime_spangrid'
        }
    ]
});
