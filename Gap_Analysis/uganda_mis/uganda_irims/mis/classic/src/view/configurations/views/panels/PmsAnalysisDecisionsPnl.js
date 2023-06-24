Ext.define('Admin.view.configurations.views.panels.PmsAnalysisDecisionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pmsanalysisdecision',
    title: 'PMS Analysis Decisions',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'pmsanalysisdecisionGrid'
        }
    ]
});