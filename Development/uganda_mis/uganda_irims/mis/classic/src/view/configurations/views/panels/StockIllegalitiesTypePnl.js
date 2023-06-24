Ext.define('Admin.view.configurations.views.panels.StockIllegalitiesTypePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'stockillegalitiestype',
    title: 'Stock Illegalities Type',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'stockillegalitiestypeGrid'
        }
    ],

});
