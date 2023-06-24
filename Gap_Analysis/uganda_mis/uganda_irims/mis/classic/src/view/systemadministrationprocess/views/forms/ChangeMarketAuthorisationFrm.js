

Ext.define('Admin.view.systemadministrationprocess.views.forms.ChangeMarketAuthorisationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'changemarketauthorisationfrm',
    itemId: 'changemarketauthorisationfrm',
    autoScroll: true,
    controller: 'systemadministrationprocessvctr',
    
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
        fieldLabel: 'Current Market Authorisation Holder',
        emptyText: 'Current Market Authorisation Holder',
        xtype:'textfield',
        allowBlank: false,
        name: 'previous_marketauthorisation'
    },{
          xtype:'panel',
          layout:{
              type:'column',
              columns:2
          },
          items:[{
              xtype: 'textfield',
              fieldLabel:'Change to Trader',
              allowBlank: false,
              readOnly: true,labelAlign: 'right',
              labelWidth: 108,
              readOnly: true,
              name: 'current_trader',
              columnWidth: 0.9
          },{
                xtype: 'button',
                iconCls:'x-fa fa-search',
                text: 'Search Trader',
                childXtype: 'searchchangetraderdetailsgrid',
                winTitle:' Search Trader Details',
                winWidth: '70%',
                ismarketauthorisation: 0,
                handler: 'funcSearchTraderDetails'
          }]
    }, {
        fieldLabel: 'Remarks(Optional',
        emptyText: 'Remarks',
        xtype:'textarea',
        allowBlank: false,
        name: 'reason'
    },{
        xtype: 'hiddenfield',
        allowBlank: false,
        name: 'previous_trader_id'
    },{
        xtype: 'hiddenfield',
        allowBlank: false,
        name: 'current_trader_id'
    }],
    buttons: [{
        text: 'Update Market Authorisation',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        formBind: true,
        name:'btnupdateauthorisation',
        action_url: 'systemadminprocess/saveChangemarketAuthorisationdetails',
        storeId: 'changemarketauthorisationdashgridstr'
    }]
});