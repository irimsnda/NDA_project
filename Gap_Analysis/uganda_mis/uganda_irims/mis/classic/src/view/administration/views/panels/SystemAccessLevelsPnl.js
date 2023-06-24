/**
 * Created by Kip on 9/18/2018.
 */
Ext.define('Admin.view.administration.views.panels.SystemAccessLevelsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'systemaccesslevelspnl',
    title: 'System Access Levels',
    userCls: 'big-100 small-100',
    itemId: 'SystemAccessLevelsDashboard',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'systemaccesslevelsgrid'
        }
    ]
});
