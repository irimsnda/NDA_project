/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.SiUnitsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'siUnitsPnl',
    title: 'Si Units',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'siUnitsGrid'
        }
    ]
});
