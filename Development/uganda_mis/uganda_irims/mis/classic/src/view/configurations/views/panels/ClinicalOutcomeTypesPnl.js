Ext.define('Admin.view.configurations.views.panels.ClinicalOutcomeTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaloutcometypes',
    title: 'Clinical Outcome Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicaloutcometypesGrid'
        }
    ],

});