Ext.define('Admin.view.configurations.views.panels.ControlledDrugsAnnualCeilingConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'controlleddrugsannualceilingconfigpnl',
    title: 'Controlled Drugs Annual Ceiling Config',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'controlleddrugsannualceilingconfiggrid'
        }
    ]
});
