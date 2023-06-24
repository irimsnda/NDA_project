Ext.define('Admin.view.configurations.views.panels.BusinessScalesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'businessscales',
    title: 'Business Scale',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'bsnScaleGrid'
        }
    ]
});
