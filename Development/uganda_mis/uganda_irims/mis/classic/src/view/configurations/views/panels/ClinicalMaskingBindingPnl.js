Ext.define('Admin.view.configurations.views.panels.ClinicalMaskingBindingPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalmaskingbinding',
    title: 'Clinical Masking Binding',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicalmaskingbindingGrid'
        }
    ],

});
