/**
 * Created by Kip on 12/7/2018.
 */
Ext.define('Admin.view.configurations.views.panels.AlterationSetupPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'alterationsetuppnl',
    title: 'Alteration Setup',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'alterationsetupgrid'
        }
    ]
});
