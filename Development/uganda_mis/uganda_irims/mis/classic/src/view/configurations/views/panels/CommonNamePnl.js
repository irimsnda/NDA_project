/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.CommonNamePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'commonNamePnl',
    title: 'Product Common Names',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'commonNameGrid'
        }
    ]
});
