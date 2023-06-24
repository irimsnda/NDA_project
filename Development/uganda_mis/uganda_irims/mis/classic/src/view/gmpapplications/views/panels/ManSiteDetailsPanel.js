/**
 * Created by Kip on 5/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.ManSiteDetailsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'mansitedetailspanel',
    layout: 'border',
    split: true,
    items: [
        {
            xtype: 'manufacturerdetailsfrm',
            region: 'north',
            height: 150
        },
        {
            xtype: 'mansitedetailstabpnl',
            region: 'center'
        }
    ]
});