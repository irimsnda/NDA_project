Ext.define('Admin.view.configurations.views.panels.PremiseInspectionRecommendationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'premiseinspectionrecommendation',
    title: 'Premise Inspection Recommendation',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'premiseinspectionrecommendationGrid'
        }
    ]
});
