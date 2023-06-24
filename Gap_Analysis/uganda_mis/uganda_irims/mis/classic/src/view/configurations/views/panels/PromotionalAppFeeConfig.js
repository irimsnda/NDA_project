Ext.define('Admin.view.configurations.views.panels.PromotionalAppFeeConfig', {
    extend: 'Ext.panel.Panel',
    xtype: 'promotionalappfeeconfig',
    title: 'Disposal Applications Fee Configurations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'promotionalappfeeconfiggrid'
        }
    ],

});
