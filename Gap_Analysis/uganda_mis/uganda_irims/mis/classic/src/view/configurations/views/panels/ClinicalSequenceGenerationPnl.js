Ext.define('Admin.view.configurations.views.panels.ClinicalSequenceGenerationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalsequencegeneration',
    title: 'Clinical Sequence Generation',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicalsequencegenerationGrid'
        }
    ],

});
