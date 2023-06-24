Ext.define('Admin.view.configurations.views.panels.ClinicalDiseaseConditionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaldiseaseconditions',
    title: 'Clinical Disease Conditions',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicaldiseaseconditionsGrid'
        }
    ],

});
