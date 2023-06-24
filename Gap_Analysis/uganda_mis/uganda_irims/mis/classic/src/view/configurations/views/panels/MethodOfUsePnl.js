/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.MethodOfUsePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'methodOfUsePnl',
    title: 'Method of Use',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'methodOfUseGrid'
        }
    ]
});
