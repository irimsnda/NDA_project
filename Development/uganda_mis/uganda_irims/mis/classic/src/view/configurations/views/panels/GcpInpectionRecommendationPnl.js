Ext.define('Admin.view.configurations.views.panels.GcpInpectionRecommendationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gcpInpectionRecommendation',
    title: 'GCP Inspection Recommendation',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'gcpInpectionRecommendationGrid'
        }
    ]
});
