Ext.define('Admin.view.configurations.views.panels.AssessmentProcessStatusesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'assessmentprocessstatuses',
    title: 'Assessment Process Statuses',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'assessmentprocessstatusesGrid'
        }
    ],

});
