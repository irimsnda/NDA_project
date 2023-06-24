/**
 * Created by Kip on 9/18/2018.
 */
Ext.define('Admin.view.administration.views.panels.SystemMenusPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'systemmenuspnl',
    title: 'System Navigation Menus',
    userCls: 'big-100 small-100',
    itemId: 'SystemMenusDashboard',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'systemmenusgrid'
        }
    ]
});
