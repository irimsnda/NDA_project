/**
 * Created by Kip on 11/4/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.ManagerQueryPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'managerquerypnl',
    layout: 'fit',
    items: [
        {
            xtype: 'managerquerygrid'
        }
    ]
});