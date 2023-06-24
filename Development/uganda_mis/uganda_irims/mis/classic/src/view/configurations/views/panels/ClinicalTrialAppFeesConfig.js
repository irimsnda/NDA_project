Ext.define('Admin.view.configurations.views.panels.ClinicalTrialAppFeesConfig', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialappfeesconfig',
    title: 'Clinical Trial Applications Fee Configurations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'clinicaltrialappfeesconfiggrid'
        }
    ],

});
