Ext.define('Admin.view.configurations.views.panels.ClinicalInterventionAllocationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalinterventionallocation',
    title: 'Clinical Intervention Allocation',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicalinterventionallocationGrid'
        }
    ],

});
