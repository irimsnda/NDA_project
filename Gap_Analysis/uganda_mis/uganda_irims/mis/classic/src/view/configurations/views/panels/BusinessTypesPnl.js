Ext.define('Admin.view.configurations.views.panels.BusinessTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'businesstypes',
    title: 'Business Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'bsnTypesGrid'
        }
    ]
});
