/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.SystemModulesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'systemModulesPnl',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'border'
    },
    defaults:{
        split: true,
        margin:2
    },
    items: [
        {
            xtype: 'systemModulesGrid',
            region:'west',
            collapsible: true,
            collapsed: false,
            width: 520,
            titleCollapse: true
        },{
            xtype: 'systemSubModulesGrid',
            region: 'center'
        }
    ]
});
