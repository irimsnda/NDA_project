

Ext.define('Admin.view.trader_accounts.views.forms.AuthorisedTradersDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'authorisedtradersdetailsfrm',
    autoScroll: true,
    controller: 'traderaccountsvctr',
    //layout: 'form',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        labelAlign: 'right',
        labelWidth: 108,
        margin: 5,
        xtype: 'textfield',
        width: '100%',
        margin: 5
    },
    layout: {
        type: 'vbox'
    },
    layout: 'vbox',
    items: [{
          xtype:'panel',
          layout:{
              type:'column',
              columns:2
          },
          items:[{
              xtype: 'textfield',
              fieldLabel:'Authorised Trader',
              allowBlank: false,
              readOnly: true,labelAlign: 'right',
              labelWidth: 108,
              name: 'authorised_trader',
              columnWidth: 0.9
          },{
                xtype: 'button',
                iconCls:'x-fa fa-search',
                text: 'Search Trader',
                childXtype: 'searchtraderdetailsgrid',
                winTitle:' Search Trader Details',
                winWidth: '70%',
                handler: 'funcSearchTraderDetails'
          }]
    },{
        xtype:'datefield',
        name: 'authorised_from',
        format:'Y-m-d',
        fieldLabel:'Authorised From'
    },{
        xtype:'datefield',
        name: 'authorised_to',format:'Y-m-d',
        fieldLabel:'Authorised To'
    },{
        fieldLabel: 'Account Status',
        name: 'authorisation_status_id',
        xtype: 'combo',
        valueField: 'id',
        queryMode: 'local',
        displayField: 'name',
        allowBlank: false,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_authorisation_statuses'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        fieldLabel: 'Remarks(Optional',
        emptyText: 'Remarks',
        xtype:'textarea',
        allowBlank: true,
        name: 'remarks'
    },{
        xtype: 'hiddenfield',
        allowBlank: false,
        name: 'traderidentification_no'
    },{
        xtype: 'hiddenfield',
        allowBlank: false,
        name: 'authorisedidentification_no'
    }],
    buttons: [{
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        formBind: true,
        storeID: 'authorisedtradersdetailsgridStr',
        handler: 'funcSaveAuthorisedtradersdetails'
    }]
});