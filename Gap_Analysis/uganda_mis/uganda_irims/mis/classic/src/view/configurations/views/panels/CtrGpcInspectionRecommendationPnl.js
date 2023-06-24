Ext.define('Admin.view.configurations.views.panels.CtrGpcInspectionRecommendationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'ctrgpcinspectionrecommendation',
    title: 'Ctr Gpc Inspection Recommendation',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'ctrgpcinspectionrecommendationGrid'
        }
    ]
});
