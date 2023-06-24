/**
 * Created by Kip on 11/23/2018.
 */
Ext.define('Admin.view.administration.views.panels.KeyFormsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'keyformspnl',
    title: 'System Key Forms',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'keyformsgrid'
        }
    ]
});
