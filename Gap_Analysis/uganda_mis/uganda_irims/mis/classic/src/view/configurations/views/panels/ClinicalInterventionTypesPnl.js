Ext.define('Admin.view.configurations.views.panels.ClinicalInterventionTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalinterventiontypes',
    title: 'Clinical Intervention Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicalinterventiontypesGrid'
        }
    ],

});
