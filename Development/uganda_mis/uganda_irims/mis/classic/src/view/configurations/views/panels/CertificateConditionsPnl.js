
Ext.define('Admin.view.configurations.views.panels.CertificateConditionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'certificateconditionspnl',
    title: 'Certificate Conditions',
    userCls: 'big-100 small-100',
    padding: 3,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'certificateconditionsgrid'
        }
    ]
});
