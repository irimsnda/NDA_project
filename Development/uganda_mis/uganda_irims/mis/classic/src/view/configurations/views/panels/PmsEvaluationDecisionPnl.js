Ext.define('Admin.view.configurations.views.panels.PmsEvaluationDecisionPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pmsevaluationdecisions',
    title: 'PMS Evaluation Decisions',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'pmsevaluationdecisionsGrid'
        }
    ]
});
