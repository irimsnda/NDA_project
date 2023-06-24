Ext.define('Admin.view.configurations.views.panels.ClinicalRegistryStatusesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalregistrystatuses',
    title: 'Clinical Registry Statuses',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicalregistrystatusesGrid'
        }
    ],

});
