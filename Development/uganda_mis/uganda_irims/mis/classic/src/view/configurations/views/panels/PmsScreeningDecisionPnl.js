Ext.define('Admin.view.configurations.views.panels.PmsScreeningDecisionPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pmsscreeningdecisions',
    title: 'PMS Screening Decisions',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'pmsscreeningdecisionsGrid'
        }
    ]
});
