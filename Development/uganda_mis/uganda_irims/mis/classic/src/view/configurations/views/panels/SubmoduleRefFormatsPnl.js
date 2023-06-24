/**
 * Created by Kip on 5/9/2019.
 */
Ext.define('Admin.view.configurations.views.panels.SubmoduleRefFormatsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'submodulerefformatspnl',
    title: 'Sub Module Reference Formats',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'submodulerefformatsgrid'
        }
    ]
});
