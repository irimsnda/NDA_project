Ext.define('Admin.view.configurations.views.panels.ControlledDrugsConvFactorsConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'controlleddrugsconvfactorsconfigpnl',
    title: 'Controlled Drugs Conversion Factors Config',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'controlleddrugsconvfactorsconfiggrid'
        }
    ]
});
