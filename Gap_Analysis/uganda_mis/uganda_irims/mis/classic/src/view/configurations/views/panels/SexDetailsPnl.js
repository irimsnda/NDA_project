Ext.define('Admin.view.configurations.views.panels.SexDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'sexdetails',
    title: 'Sex Details',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'sexdetailsGrid'
        }
    ],

});