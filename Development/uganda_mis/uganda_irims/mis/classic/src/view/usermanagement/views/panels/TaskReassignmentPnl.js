Ext.define('Admin.view.usermanagement.views.panels.TaskReassignmentPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'taskreassignmentpnl',
    title: 'Task Reassingment',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'taskreassignmentgrid'
        }
    ]
});
