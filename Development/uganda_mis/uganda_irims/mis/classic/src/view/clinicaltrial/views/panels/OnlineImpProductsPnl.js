/**
 * Created by Kip on 2/6/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.OnlineImpProductsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlineimpproductspnl',
    controller: 'clinicaltrialvctr',
    layout: 'border',
    defaults: {
        split: true
    },
    height: 565,
    frame: true,
    items: [
        {
            xtype: 'impproductsfrm',
            region: 'center'
        },
        {
            xtype: 'onlineimpproductingredientsgrid',
            region: 'south',
            hidden: true,
            height: 250
        }
    ]
});