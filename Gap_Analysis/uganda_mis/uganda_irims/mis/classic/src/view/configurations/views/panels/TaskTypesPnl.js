Ext.define('Admin.view.configurations.views.panels.TaskTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'tasktypes',
    title: 'Task Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'taskTypesGrid'
        }
    ]
});
