Ext.define('Admin.view.registration_cancellation.panels.RegistrationCancellationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'registrationcancellation',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'registrationcancellationGrid'
        }
    ]
});
