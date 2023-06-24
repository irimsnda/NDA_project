Ext.define('Admin.view.configurations.views.panels.GmpProductlineRecommendationTypePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpproductlinerecommendationtype',
    title: 'Gmp Productline Recommendation Type',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'gmpproductlinerecommendationtypeGrid'
        }
    ],

});
