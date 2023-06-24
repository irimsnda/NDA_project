/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.RefNumbersVariablesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'refnumbersvariablespnl',
    title: 'Reference Numbers Variables',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'refnumbersvariablesgrid'
        }
    ]
});
