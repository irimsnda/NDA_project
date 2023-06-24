Ext.define('Admin.view.configurations.views.panels.ClinicalNatureofControlsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalnatureofcontrols',
    title: 'Clinical Nature of Controls',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicalnatureofcontrolsGrid'
        }
    ],

});
