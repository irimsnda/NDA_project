Ext.define('Admin.view.summaryreport.revenue.viewControllers.RevenueReportViewCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.revenueReportViewCtr',

    init: function () {
    },
//graphs
    onAxisLabelRender: function (axis, label, layoutContext) {
        var value = layoutContext.renderer(label);
        return value === 0 ? '0' : Ext.util.Format.number(value);
    },

    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value);
    },

    onGridColumnRender: function (v) {
        return Ext.util.Format.number(v);
    },
    printColumnReceipt: function (item) {
      var record = item.getWidgetRecord(),
          payment_id = record.get('payment_id');
      this.fireEvent('printReceipt', payment_id);
  },
    //end of graphs
setReportGlobalStore:function (obj, options) {
        this.fireEvent('setReportGlobalStore', obj, options);
    },
    
    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },
    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
      setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },

    setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
   func_tipRender: function(toolTip, storeItem, item){
                  toolTip.setHtml(storeItem.get('received_applications')+' '+item.field+ ' for '+storeItem.get('section_name') );
                },
   
func_LoadreportFilters:function(btn) {
   var form=btn.up('form'),
       module_id=form.down('combo[name=module_id]').getValue(),
       sub_module_id=form.down('combo[name=sub_module_id]').getValue(),
       section_id=form.down('combo[name=section_id]').getValue(),
       zone_id=form.down('combo[name=zone_id]').getValue(),
       to_date=form.down('datefield[name=to_date]').getValue(),
       from_date=form.down('datefield[name=from_date]').getValue(),
       container=form.up('panel'),
       gridStr=container.down('gridpanel').getStore(),
       cartesianStr=container.down('cartesian').getStore();
    

       cartesianStr.getProxy().extraParams={
        module_id:module_id,
        section_id:section_id,
        sub_module_id:sub_module_id,
        zone_id:zone_id,
        to_date:to_date,
        from_date:from_date
       }
       gridStr.getProxy().extraParams={
        module_id:module_id,
        section_id:section_id,
        sub_module_id:sub_module_id,
        zone_id:zone_id,
        to_date:to_date,
        from_date:from_date
       }

      Ext.getBody().mask('Filtering Please wait...');
       
       
       if(gridStr){
            gridStr.removeAll();
            gridStr.load();
         }
       if(cartesianStr){
        cartesianStr.removeAll();
            cartesianStr.load({
              callback: function() {
                 Ext.getBody().unmask();
              },
            });
          }
     
    },

    func_setSubmodule:function(combo,newValue,oldvalue,eopts) {
      var form=combo.up('form'),
          sub_module=form.down('combo[name=sub_module_id]'),
          str=sub_module.getStore();
          str.removeAll();
          var filters={'module_id':newValue};
          filters = JSON.stringify(filters);
          str.load({params:{filters:filters}});
    },
   Grid_LoadreportFilters:function(btn) {
     var form=btn.up('form'),
         panel=form.up('panel'),
         filterFrm=panel.down('form'),
         btn=filterFrm.down('button[name=filter_Report]');
         this.func_LoadreportFilters(btn);
   },
   init_load_Filters:function(me) {
    var panel=me.up('panel'),
        filterFrm=panel.down('form'),
        btn=filterFrm.down('button[name=filter_Report]');
        this.func_LoadreportFilters(btn);
   },

   func_LoadDailyTransreportFilters:function(btn) {
    var form= btn.up('form'),
         grid=form.up('grid');
         grid.getStore().load();
   },
   funcPrintRevenueSummaryReport:function(btn){
          var me=btn.up('panel'),
              section_id=me.down('combo[name=section_id]').getValue(),
              sub_module_id=me.down('combo[name=sub_module_id]').getValue(),
              to_date=me.down('datefield[name=to_date]').getValue(),
              revenue_types=me.down('combo[name=revenue_types]').getValue(),
              module_id=me.down('combo[name=module_id]').getValue(),
              zone_id=me.down('combo[name=zone_id]').getValue(),
              from_date=me.down('datefield[name=from_date]').getValue();
              from_date = Ext.Date.format(from_date,'Y-m-d'),
              to_date = Ext.Date.format(to_date,'Y-m-d');
              redirect = 'summaryreport/printRevenueSummaryReport?section_id='+section_id+'&sub_module_id='+sub_module_id+'&to_date='+to_date+'&revenue_types='+revenue_types+'&module_id='+module_id+'&zone_id='+zone_id+'&from_date='+from_date;
          print_report(redirect);
   },
   func_exportRevenueReport: function(btn) {
    var me=btn.up('panel'),
        section_id=me.down('combo[name=section_id]').getValue(),
        sub_module_id=me.down('combo[name=sub_module_id]').getValue(),
        to_date=me.down('datefield[name=to_date]').getValue(),
        revenue_types= '';
        module_id=me.down('combo[name=module_id]').getValue(),
        zone_id=me.down('combo[name=zone_id]').getValue(),
        from_date=me.down('datefield[name=from_date]').getValue();

        Ext.getBody().mask('Exporting...Please wait...');

        if(me.down('combo[name=revenue_types]')){
          var  revenue_types=me.down('combo[name=revenue_types]').getValue();
          }

      Ext.Ajax.request({
                      url: 'summaryreport/exportPaymentDetails',
                      method: 'GET',
                      headers: {
                                'Authorization':'Bearer '+access_token
                            },
                      params : {
                                  'issueplace':zone_id,
                                  'function':btn.xPrintFunc,
                                  'filename':btn.xFileName,
                                  'sub_module_id':sub_module_id,
                                  'module_id': module_id,
                                  'section_id': section_id,
                                  'to_date': to_date,
                                  'from_date':from_date,
                                  'revenue_types':revenue_types,

                    },
                      
                       success: function (response, textStatus, request) {
                        Ext.getBody().unmask();

                        var t = JSON.parse(response.responseText);
                        var a = document.createElement("a");
                        a.href = t.file; 
                        a.download = t.name;
                        document.body.appendChild(a);

                       a.click();
                     
                        a.remove();
      
                      },
                      failure: function(conn, response, options, eOpts) {
                           Ext.getBody().unmask();
                           Ext.Msg.alert('Error', 'please try again');
                      }});
  },
  funcPrintGlSummarrReport:function(btn){
    var me=btn.up('grid'),
        section_id=me.down('combo[name=section_id]').getValue(),
        to_date=me.down('datefield[name=to_date]').getValue(),
        zone_id=me.down('combo[name=zone_id]').getValue(),
        gl_account=me.down('combo[name=gl_account]').getValue(),
        from_date=me.down('datefield[name=from_date]').getValue(),
        from_date = Ext.Date.format(from_date,'Y-m-d'),
        to_date = Ext.Date.format(to_date,'Y-m-d');
        redirect = 'summaryreport/printGlSummaryReport?section_id='+section_id+'&gl_account='+gl_account+'&to_date='+to_date+'&zone_id='+zone_id+'&from_date='+from_date;
    print_report(redirect);
},
  funct_ExportGLCodedReport: function(btn) {
    var me=btn.up('grid'),
        section_id=me.down('combo[name=section_id]').getValue(),
        to_date=me.down('datefield[name=to_date]').getValue(),
        zone_id=me.down('combo[name=zone_id]').getValue(),
        gl_account=me.down('combo[name=gl_account]').getValue(),
        from_date=me.down('datefield[name=from_date]').getValue(),
        form=Ext.create('Ext.form.Panel', { }),
        frm=form.getForm();

        Ext.Msg.show({
         title:'Time Warning',
         message: 'This Export Operation may take some time depending on filters provided',
         buttons: Ext.Msg.OKCANCEL,
         icon: Ext.Msg.QUESTION,
         fn: function(btn) {
         if (btn === 'ok') {

                Ext.getBody().mask('Exporting...Please wait...');
                frm.submit({
                     url: 'summaryreport/ExportGLCodedReport',
                     method: 'GET',
                     params : {
                                'gl_account':gl_account,
                                'zone_id': zone_id,
                                'section_id': section_id,
                                'to_date': to_date,
                                'from_date':from_date,
                              },
                      success: function (action, response) {
                                var t = response.result;
                                Ext.getBody().unmask();
                                var a = document.createElement("a");
                                a.href = t.file; 
                                a.download = t.name;
                                document.body.appendChild(a);

                                 a.click();
                               
                                 a.remove();
              
                              },
                      failure: function(action, response) {

                                   Ext.Msg.alert('Error', 'please try again');
                                    Ext.getBody().unmask();
                              }
                });
          } else {
              Ext.Msg.alert('Terminated', 'Export operation canceled');
          }
    }
});
        

      // Ext.Ajax.request({
      //                 url: 'summaryreport/ExportGLCodedReport',
      //                 method: 'GET',
      //                 headers: {
      //                           'Authorization':'Bearer '+access_token
      //                       },
      //                 params : {
      //                             'gl_account':gl_account,
      //                             'function':btn.xPrintFunc,
      //                             'filename':btn.xFileName,
      //                             'sub_module_id':sub_module_id,
      //                             'module_id': module_id,
      //                             'section_id': section_id,
      //                             'to_date': to_date,
      //                             'from_date':from_date,

      //               },
                      
      //                  success: function (response, textStatus, request) {
      //                   var t = JSON.parse(response.responseText);
      //                   Ext.getBody().unmask();
      //                   var a = document.createElement("a");
      //                   a.href = t.file; 
      //                   a.download = t.name;
      //                   document.body.appendChild(a);

      //                  a.click();
                     
      //                   a.remove();
      
      //                 },
      //                 failure: function(conn, response, options, eOpts) {
      //                      Ext.Msg.alert('Error', 'please try again');
      //                       Ext.getBody().unmask();
      //                 }});
        },

   DailyFinanceTransExport:function(btn) {
     var me=btn.up('grid'),
        section_id=me.down('combo[name=section_id]').getValue(),
        sub_module_id=me.down('combo[name=sub_module_id]').getValue(),
        to_date=me.down('datefield[name=to_date]').getValue(),
        module_id=me.down('combo[name=module_id]').getValue(),
        from_date=me.down('datefield[name=from_date]').getValue();
        Ext.getBody().mask('Exporting...Please wait...');
        

      Ext.Ajax.request({
                      url: 'summaryreport/exportDailyTransactions',
                      method: 'GET',
                      headers: {
                                'Authorization':'Bearer '+access_token
                            },
                      params : {
                                  'function':btn.xPrintFunc,
                                  'filename':btn.xFileName,
                                  'sub_module_id':sub_module_id,
                                  'module_id': module_id,
                                  'section_id': section_id,
                                  'to_date': to_date,
                                  'from_date':from_date,

                    },
                      
                       success: function (response, textStatus, request) {
                        Ext.getBody().unmask();
                        var t = JSON.parse(response.responseText);
                        var a = document.createElement("a");
                        a.href = t.file; 
                        a.download = t.name;
                        document.body.appendChild(a);

                       a.click();
                     
                        a.remove();
      
                      },
                      failure: function(conn, response, options, eOpts) {
                           Ext.Msg.alert('Error', 'please try again');
                            Ext.getBody().unmask();

                      }});
        },
  funcFilterCreditNoteReport: function(btn){
    var form = btn.up('form'),
        panel = form.up('panel'),
        requestgrid = panel.down('requestedcreditnotesummaryreportgrid'),
        approvalgrid = panel.down('approvedcreditnotesummaryreportgrid'),
        Reqstore = requestgrid.getStore();
        Appstore = approvalgrid.getStore();
    Reqstore.removeAll();
    Appstore.removeAll();
    Appstore.load();
    Reqstore.load();
  },
  funcClearFilter: function(btn){
    var form = btn.up('form');
    form.reset();
  },
  funcExportCreditNoteReport: function(btn){
    var form = btn.up('form'),
      tabPanel = form.up('panel'),
      activePanel = tabPanel.getActiveTab(),
      filterfield = activePanel.getPlugin('filterfield'),
      form_values = form.getValues(),
      form_values = convert_object(form_values);
      filter_array = Ext.pluck(filterfield.getgridFilters(activePanel), 'config');
      filter = Ext.JSON.encode(filter_array);  
    if(tabPanel.items.indexOf(activePanel) == 0 ){
      print_report('summaryreport/exportData?filter=' + encodeURIComponent(filter) + '&function=getRequestCreditNoteSummaryReport&filename=Requested_Credit_Note_Report' + form_values);
    }else{
      print_report('summaryreport/exportData?filter=' + encodeURIComponent(filter) + '&function=getApprovedCreditNoteSummaryReport&filename=Approved_Credit_Note_Report' + form_values);
    }

  }
});