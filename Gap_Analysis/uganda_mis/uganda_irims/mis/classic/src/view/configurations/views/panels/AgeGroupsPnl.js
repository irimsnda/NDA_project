Ext.define('Admin.view.configurations.views.panels.AgeGroupsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'agegroups',
    title: 'Age Groups',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'agegroupsGrid'
        }
    ],

});