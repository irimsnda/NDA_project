/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.Systemsubmodulespnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'systemsubmodulespnl',
    title: 'Systems Sub-Modules',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'systemsubmodulesgrid'
        }
    ]
});
