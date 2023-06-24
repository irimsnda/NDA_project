Ext.define('Admin.view.configurations.views.panels.RegionalAuthoritiesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'regionalauthorities',
    title: 'Regional Authorities',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'regionalauthoritiesGrid'
        }
    ],

});
