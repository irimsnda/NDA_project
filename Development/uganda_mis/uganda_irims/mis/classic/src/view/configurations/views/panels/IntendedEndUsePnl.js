/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.intendedEndUsePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'intendedEndUsePnl',
    title: 'Intended End Use',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'intendedEndUseGrid'
        }
    ]
});
