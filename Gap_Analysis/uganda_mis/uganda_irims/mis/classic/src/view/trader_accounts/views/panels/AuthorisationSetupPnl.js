Ext.define('Admin.view.trader_accounts.views.panels.AuthorisationSetupPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'authorisationsetuppnl',
    userCls: 'big-100 small-100',
    margin: '2 0 2 0',
    layout: {
        type: 'fit'
    },
    tbar:['->',{
        xtype: 'tbseparator',
        width: 20
    }, {
        xtype: 'displayfield',
        name: 'trader_name',
        fieldLabel: 'Trader Name',
        labelAlign:'top',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px'
        }
    }, {
        xtype: 'displayfield',
        name: 'trader_no',
        fieldLabel: 'Trader No', 
        labelAlign:'top',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px'
        }
    },{
        xtype: 'displayfield',
        name: 'trader_status', labelAlign:'top',
        fieldLabel: 'Trader Status',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px'
        }
    }],
    bbar:[{
        text: 'Return',
        iconCls: 'x-fa fa-backward',
        action: 'back',
        currentPnlXtype: 'authorisationsetuppnl',
        containerPnlXtype: 'traderauthorisationsetuppnl',
        hiddenCompXtype: 'traderauthorisationgrid',
        containerType: 'traderauthorisationsetuppnl',
        ui: 'soft-purple',
        handler: 'funcBackToDashboardPnl'
    }],
    items: [
        {
            xtype: 'authorisedtradersdetailsgrid',
           
        }
    ]
});