Ext.define('Admin.view.configurations.views.panels.gcpinspectionrecommendationsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gcpinspectionrecommendations',
    title: 'Gcp Inspection Recommendations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'gcpinspectionrecommendationsGrid'
        }
    ],

});
