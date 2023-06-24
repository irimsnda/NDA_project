/**
 * Created by Kip on 2/25/2019.
 */
Ext.define('Admin.controller.SystemAdministrationProcessCtr', {
  extend: 'Ext.app.Controller',
  stores:[

  ],
  config: {
      refs: [{
          ref: 'mainPanel',
          selector: 'maincontainerwrap'
      }, {
          ref: 'mainTabPanel',
          selector: '#contentPanel'
      }, {
          ref: 'retentionchargespnl',
          selector: '#retentionchargespnl'
      }, {
        ref: 'changemarketauthorisationfrm',
        selector: '#changemarketauthorisationfrm'
    }, {
        ref: 'changelocaltechnicalrepresenatativefrm',
        selector: '#changelocaltechnicalrepresenatativefrm'
    }, {
        ref: 'applicationownershipammendmentsfrm',
        selector: '#applicationownershipammendmentsfrm'
    }],
      control: {
          'changemarketauthorisationdashgrid': {
              refresh: 'refreshchangemarketauthorisationdashgrid'
          },
          'marketauthorisationproductsgrid': {
            refresh: 'refreshmarketauthorisationproductsgrid'
        },
        'changemarketauthorisationtb button[name=changemarketauthorisationbtn]': {
            click: 'funcUniformTbHome'
        },
        'changelocaltechnicalrepresentativetb button[name=changemarketauthorisationbtn]': {
            click: 'funcUniformTbHome'
        },
        'searchchangetraderdetailsgrid': {
            itemdblclick: 'funcSearchchangetraderdetailsgridDbClick'
        },
        'searchammendmenttraderdetailsgrid': {
            itemdblclick: 'funcsearchammendmenttraderdetailsgridDbClick'
        },
        
        'changemarketauthorisationfrm button[name=btnupdateauthorisation]': {
            click: 'funcSaveAuthorisedtradersdetails'
        },'changelocaltechnicalrepresenatativefrm button[name=btnupdateauthorisation]': {
            click: 'funcSaveAuthorisedtradersdetails'
        },'applicationownershipammendmentsfrm button[name=btnupdateauthorisation]': {
            click: 'funsaveApplicationownershipammendmentsDetails'
        },'appcertificatereupdaterequestsfrm button[name=btnupdateauthorisation]': {
            click: 'funsaveApplicationownershipammendmentsDetails'
        }
        
        
      }
  },
  listen: {
      controller: {
          '*': {
            onChangeMarketAuthorisationRequest:'onChangeMarketAuthorisationRequest',
            onltrchangeRequest:'onltrchangeRequest'
             
          }
      }
  },funsaveApplicationownershipammendmentsDetails:function(btn){
    var form = btn.up('form'),
    storeId = btn.storeId,
    action_url = btn.action_url,
    frm = form.getForm(),
    win = form.up('window'),
    mainTabPanel = this.getMainTabPanel(),
    store = Ext.getStore(storeId),
    activeTab = mainTabPanel.getActiveTab();
  
    
    if (frm.isValid()) {
        frm.submit({
            url: action_url,
            waitMsg: 'Updating Application Applicant Details',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (frm, action) {
                var resp = action.result;
                toastr.success(resp.message, ' Response');
                win.close();
                store.load();

            },
            failure: function (frm, action) {
                var resp = action.result;
                toastr.error(resp.message, 'Failure Response');
            }
        });
    }

  } ,funcSaveAuthorisedtradersdetails:function(btn){
    var form = btn.up('form'),
        storeId = btn.storeId,
        action_url = btn.action_url,
        frm = form.getForm(),
        win = form.up('window'),
        mainTabPanel = this.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        grid = activeTab.down('grid'),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [];

            Ext.each(selected_records, function (item) {
                var reg_product_id = item.data.regproduct_id,
                product_id = item.data.product_id,
                application_code = item.data.application_code,
                module_id = item.data.module_id,
                sub_module_id = item.data.sub_module_id,
                section_id = item.data.section_id;
                previous_localagent_id = item.data.local_agent_id;
                
                    obj = {
                        reg_product_id: reg_product_id,
                        product_id: product_id,
                        application_code:application_code,
                        module_id:module_id,
                        sub_module_id:sub_module_id,
                        section_id:section_id,
                        previous_localagent_id:previous_localagent_id
                    };
                selected.push(obj);
                //selected.push(item.data.id);
            });
        store = Ext.getStore(storeId);
        
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Updating Market authroisation Details',
                params:{
                    selectedproductsapp:JSON.stringify(selected),
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (frm, action) {
                    var resp = action.result;
                    toastr.success(resp.message, ' Response');
                    win.close();
                    store.load();

                },
                failure: function (frm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
},  funcUniformTbHome: function (btn) {
    var me = this,
        dashwrapper = btn.dashwrapper,
        mainTabPanel = me.getMainTabPanel(),
        sec_dashboard = btn.sec_dashboard,
        activeTab = mainTabPanel.getActiveTab(),
        dashboardWrapper = activeTab.down(dashwrapper);
    if (!dashboardWrapper.down(sec_dashboard)) {
        dashboardWrapper.removeAll();
        dashboardWrapper.add({xtype: sec_dashboard});
    }
}, refreshchangemarketauthorisationdashgrid:function(me){
      var store = me.getStore(), grid = me.up('grid'),
          changed_fromdate  = grid.down('datefield[name=changed_fromdate]').getValue(), 
             changed_todate  = grid.down('datefield[name=changed_todate]').getValue();
    
          store.getProxy().extraParams = {
            changed_fromdate: changed_fromdate,
            changed_todate: changed_todate
          };
      
  }, 
  refreshmarketauthorisationproductsgrid:function(tb){
      var me = this,
        store = tb.getStore(), grid = tb.up('grid'),
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        trader_id  = activeTab.down('hiddenfield[name=trader_id]').getValue();

            store.getProxy().extraParams = {
                trader_id: trader_id
              };
       
       
}, 

  onChangeMarketAuthorisationRequest:function(btn){
            Ext.getBody().mask('Please wait...');
            var me = this,
                mainTabPanel = me.getMainTabPanel(),
                activeTab = mainTabPanel.getActiveTab(),
                dashboardWrapper = activeTab.down('#changemarketauthorisationdashwrapper');
             
            dashboardWrapper.removeAll();
            var workflowContainer = Ext.widget('changemarketauthorisationpnl');
           
            dashboardWrapper.add(workflowContainer);
            //reload Stores 
            Ext.Function.defer(function () {
                Ext.getBody().unmask();
            }, 200);
  },
  
  onltrchangeRequest:function(){
    Ext.getBody().mask('Please wait...');
    var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        dashboardWrapper = activeTab.down('#changelocaltechnicalrepresentativedashwrapper');
     
    dashboardWrapper.removeAll();
    var workflowContainer = Ext.widget('changelocaltechnicalrepresenatativepnl');
   
    dashboardWrapper.add(workflowContainer);
    //reload Stores 
    Ext.Function.defer(function () {
        Ext.getBody().unmask();
    }, 200);
},
funcsearchammendmenttraderdetailsgridDbClick:function(view,record){
    var grid = view.grid,
    me = this,
    win = grid.up('window'),
    frm = me.getApplicationownershipammendmentsfrm();
        frm.down('hiddenfield[name=current_applicant_id]').setValue(record.get('applicant_id'));
        frm.down('textfield[name=current_trader]').setValue(record.get('applicant_name'));
    win.close();

},
  funcSearchchangetraderdetailsgridDbClick:function(view, record){
            var grid = view.grid,
                me = this,
                win = grid.up('window'),
                ismarketauthorisation = grid.ismarketauthorisation,
                mainTabPanel = me.getMainTabPanel(),
                activeTab = mainTabPanel.getActiveTab();

                if(ismarketauthorisation == 1){
                    activeTab.down('hiddenfield[name=trader_id]').setValue(record.get('applicant_id'));
                    activeTab.down('displayfield[name=trader_name]').setValue(record.get('applicant_name'));
                    var grid = activeTab.down('grid'),
                    store = grid.store;
                    store.removeAll();
                    store.load();
                }
                else if (ismarketauthorisation == 2){
                    var frm = this.getChangelocaltechnicalrepresenatativefrm();
                    frm.down('hiddenfield[name=local_agent_id]').setValue(record.get('applicant_id'));
                    frm.down('textfield[name=local_technical_representative]').setValue(record.get('applicant_name'));
                }
                else{
                        var frm = this.getChangemarketauthorisationfrm();
                        frm.down('hiddenfield[name=current_trader_id]').setValue(record.get('applicant_id'));
                        frm.down('textfield[name=current_trader]').setValue(record.get('applicant_name'));
                       
                }
                win.close();
  }
});