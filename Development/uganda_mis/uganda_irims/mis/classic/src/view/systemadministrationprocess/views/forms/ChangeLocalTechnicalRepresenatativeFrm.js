

Ext.define('Admin.view.systemadministrationprocess.views.forms.ChangeLocalTechnicalRepresenatativeFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'changelocaltechnicalrepresenatativefrm',
    itemId: 'changelocaltechnicalrepresenatativefrm',
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
        name: 'marketauthorisation_holder'
    },{
          xtype:'panel',
          layout:{
              type:'column',
              columns:2
          },
          items:[{
              xtype: 'textfield',
              fieldLabel:'Local Technical Represenatative',
              allowBlank: false,
              readOnly: true,labelAlign: 'right',
              labelWidth: 108,
              readOnly: true,
              name: 'local_technical_representative',
              columnWidth: 0.9
          },{
                xtype: 'button',
                iconCls:'x-fa fa-search',
                text: 'Search Trader',
                childXtype: 'searchchangetraderdetailsgrid',
                winTitle:' Search Trader Details',
                winWidth: '70%',
                ismarketauthorisation: 2,
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
        name: 'trader_id'
    },{
        xtype: 'hiddenfield',
        allowBlank: false,
        name: 'local_agent_id'
    }],
    buttons: [{
        text: 'Update Local Agent Representative',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        formBind: true,
        name:'btnupdateauthorisation',
        action_url: 'systemadminprocess/saveChangeLocalTechnicalRepresentative',
        storeId: 'changemarketauthorisationdashgridstr'
    }]
});