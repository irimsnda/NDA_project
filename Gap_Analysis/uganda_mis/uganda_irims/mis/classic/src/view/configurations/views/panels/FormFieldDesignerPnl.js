Ext.define('Admin.view.configurations.views.panels.FormFieldDesignerPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'formFieldDesignerPnl',
    title: 'Forms Designer',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'formFieldsDesignerGrid'
        }
    ]
});
