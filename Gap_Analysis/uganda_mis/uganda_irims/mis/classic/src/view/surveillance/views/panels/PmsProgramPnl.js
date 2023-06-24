/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.panels.PmsProgramPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pmsprogrampnl',
    //title: 'PMS Program',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            title: 'Existing Programs',
            xtype: 'pmsprogramgrid'
        }
    ]
});
