
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.panels.ChangeMarketAuthorisationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'changemarketauthorisationpnl',
    controller: 'systemadministrationprocessvctr',
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 60,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                value: 'Change Product Market Authorisation',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
              }, {
                    xtype: 'tbseparator',
                    width: 20
                },  {
                    xtype: 'displayfield',
                    name: 'trader_name',
                    fieldLabel: 'Market Authorisation',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },{xtype:'hiddenfield','name':'trader_id'}
            ]
        }
    ],
    tbar:['->',{
            text:'Search Market Authorisation Detail',
            iconCls:'x-fa fa-search',
            margin:5,
            ui: 'soft-green',
                childXtype: 'searchchangetraderdetailsgrid',
                winTitle:' Search Trader Details',
                winWidth: '70%',
                ismarketauthorisation:1,
                handler: 'funcSearchTraderDetails'
    }],
    items: [
        {
            xtype: 'marketauthorisationproductsgrid',
            text:'Market Authorisation Registered Products'
        }
    ],
    bbar:['->',{
        text:'Update Market Authorisation(Selected Product)',
        iconCls: 'fa fa-edit',
        ui:'soft-purple',
        name:'selected_btn',
        disabled: true,
        childXtype: 'changemarketauthorisationfrm',
        winTitle:'Change Local Technical Representative',
        winWidth: '30%',
        handler: 'funcOnShowUpdateMarketAuthorisation'

}]
});