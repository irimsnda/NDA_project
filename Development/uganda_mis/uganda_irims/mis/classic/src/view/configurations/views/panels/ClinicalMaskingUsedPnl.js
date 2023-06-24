Ext.define('Admin.view.configurations.views.panels.ClinicalMaskingUsedPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalmaskingused',
    title: 'Clinical Masking Used',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicalmaskingusedGrid'
        }
    ],

});
