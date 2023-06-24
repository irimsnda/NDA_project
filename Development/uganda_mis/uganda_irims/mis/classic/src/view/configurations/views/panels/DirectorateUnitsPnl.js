Ext.define('Admin.view.configurations.views.panels.DirectorateUnitsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'directorateunits',
    title: 'Directorate Unit',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'directorateunitsGrid'
        }
    ],

});