Ext.define('Admin.view.configurations.views.panels.ClinicalStudyPurposesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalstudypurposes',
    title: 'Clinical Study Purposes',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicalstudypurposesGrid'
        }
    ],

});
