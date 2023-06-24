/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.PermitTypeCategoriesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'permittypecategoriespnl',
    title: 'Permit Type Category',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'permittypecategoriesgrid'
        }
    ]
});
