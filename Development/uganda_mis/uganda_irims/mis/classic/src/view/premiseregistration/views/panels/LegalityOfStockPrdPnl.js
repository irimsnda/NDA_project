/**
 * Created by Kip on 6/4/2019.
 */
Ext.define('Admin.view.premiseregistration.views.panels.LegalityOfStockPrdPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'legalityofstockprdpnl',
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
    height: 600,
    layout: {
        type: 'border'
    },
    defaults:{
        collapsible: true,
        split: true,
        titleCollapse: true
    },
    
    items:[{
            xtype: 'legalityofstockprdfrm',
            region:'north'
        },{
            xtype:'legalityofstockprdgrid',
            region:'center'
        }
    ]
});