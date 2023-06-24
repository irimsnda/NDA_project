Ext.define('Admin.view.configurations.views.panels.CountryRegionPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'countryregions',
    title: 'COuntry Regions',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'countryregionsGrid'
        }
    ]
});
