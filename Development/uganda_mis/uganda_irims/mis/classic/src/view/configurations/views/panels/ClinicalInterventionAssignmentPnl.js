Ext.define('Admin.view.configurations.views.panels.ClinicalInterventionAssignmentPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalinterventionassignment',
    title: 'Clinical Intervention Assignment',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicalinterventionassignmentGrid'
        }
    ],

});
