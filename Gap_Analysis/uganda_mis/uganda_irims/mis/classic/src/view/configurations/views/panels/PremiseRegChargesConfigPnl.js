Ext.define('Admin.view.configurations.views.panels.PremiseRegChargesConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'premiseregChargesConfig',
    title: 'Premise Invoice Charges Config',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'premiseregChargesConfigGrid'
        }
    ]
});