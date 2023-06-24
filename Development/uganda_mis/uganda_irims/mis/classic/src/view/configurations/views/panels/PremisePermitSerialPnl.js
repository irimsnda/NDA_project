Ext.define('Admin.view.configurations.views.panels.PremisePermitSerialPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisepermitserial',
    title: 'Premise Permit Serial',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'premisepermitserialGrid'
        }
    ],

});
