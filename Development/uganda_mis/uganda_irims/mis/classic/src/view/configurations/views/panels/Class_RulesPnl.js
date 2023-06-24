Ext.define('Admin.view.configurations.views.panels.Class_RulesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'class_rules',
    title: 'Classification Rules',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'class_rulesGrid'
        }
    ]
});
