Ext.define('Admin.view.configurations.views.panels.BanksPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'banks',
    title: 'Banks',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'banksGrid'
        }
    ],

});
