

Ext.define('Admin.view.systemadministrationprocess.views.forms.ApplicationOwnerShipAmmendmentsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationownershipammendmentsfrm',
    itemId: 'applicationownershipammendmentsfrm',
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
        xtype: 'combo',
        fieldLabel: 'Modules',
        margin: '0 20 20 0',
        name: 'module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'modules'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        fieldLabel: 'Reference Number/Tracking Number',
        emptyText: 'Reference Number',
        xtype:'textfield',
        allowBlank: false,
        name: 'reference_no'
    },{
        fieldLabel: 'Requested By',
        emptyText: 'Request By',
        xtype:'textfield',
        allowBlank: false,
        name: 'requested_by'
    },{
        fieldLabel: 'Reason ',
        emptyText: 'Reason ',
        xtype:'textarea',
        allowBlank: false,
        name: 'reason'
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
                childXtype: 'searchammendmenttraderdetailsgrid',
                winTitle:' Search Trader Details',
                winWidth: '70%',
                ismarketauthorisation: 0,
                handler: 'funcSearchTraderDetails'
          }]
    }, {
        xtype: 'hiddenfield',
        allowBlank: false,
        name: 'current_applicant_id'
    },{
        xtype: 'combo',
        fieldLabel: 'Change All Applicant Instances',
        margin: '0 20 20 0',
        name: 'ammendment_option_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        value:2,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_confirmations'
                        }
                    }
                },
                isLoad: true
            }
        }
    },],
    buttons: [{
        text: 'Update Applicant Details',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        formBind: true,
        name:'btnupdateauthorisation',
        action_url: 'systemadminprocess/saveApplicationownershipammendmentsDetails',
        storeId: 'applicationownershipammendmentsgridstr'
    }]
});