Ext.define('Admin.view.configurations.views.panels.RecommendationTablePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'recommendationtable',
    title: 'Recommendation Table',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'recommendationtableGrid'
        }
    ],

});
