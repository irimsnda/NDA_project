
Ext.define('Admin.view.configurations.views.panels.RegistrationConditionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'registrationconditionspnl',
    title: 'Registration Conditions',
    userCls: 'big-100 small-100',
    padding: 3,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'registrationconditionsgrid'
        }
    ]
});
