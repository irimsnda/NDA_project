Ext.define('Admin.view.configurations.views.panels.BusinessTypeDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'businesstypedetails',
    title: 'Business Type Details',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'bsnTypeDetailsGrid'
        }
    ]
});
