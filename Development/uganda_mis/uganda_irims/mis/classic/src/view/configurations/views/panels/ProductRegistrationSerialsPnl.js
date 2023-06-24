Ext.define('Admin.view.configurations.views.panels.ProductRegistrationSerialsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'productregistrationserials',
    title: 'Product Registration Serials',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'productregistrationserialsGrid'
        }
    ],

});
