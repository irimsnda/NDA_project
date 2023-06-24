Ext.define('Admin.view.configurations.views.panels.CountriesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'countries',
    title: 'Countries',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'countriesGrid'
        }
    ]
});
