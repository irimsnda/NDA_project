Ext.define('Admin.view.configurations.views.panels.PackagingUnitsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'packagingunits',
    title: 'Packaging Units',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'packagingunitsGrid'
        }
    ],

});
