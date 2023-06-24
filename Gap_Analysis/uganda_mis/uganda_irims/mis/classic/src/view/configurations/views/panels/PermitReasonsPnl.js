/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.PermitReasonsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'permitreasonspnl',
    title: 'Permit Reason',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'permitreasonsgrid'
        }
    ]
});
