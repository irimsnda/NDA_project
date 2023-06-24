Ext.define('Admin.view.configurations.views.panels.ClinicalAllocationSequencePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalallocationsequence',
    title: 'Clinical Allocation Sequence',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicalallocationsequenceGrid'
        }
    ],

});