
Ext.define('Admin.view.configurations.views.panels.RegulationRegistrationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'regulationregistrationpnl',
    title: 'Regulations Registration',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'regulationregistrationgrid'
        }
        ]
});
