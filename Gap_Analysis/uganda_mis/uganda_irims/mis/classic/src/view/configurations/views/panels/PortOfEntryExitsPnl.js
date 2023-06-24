/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.PortOfEntryExitsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'portofentryexitspnl',
    title: 'Port Of Entry/Entry',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    padding: 2,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'portofentryexitsgrid'
        }
    ]
});
