Ext.define('Admin.view.configurations.views.panels.RecommendationTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'recommendationtypes',
    title: 'Recommendation Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'recommendationtypesGrid'
        }
    ],

});
