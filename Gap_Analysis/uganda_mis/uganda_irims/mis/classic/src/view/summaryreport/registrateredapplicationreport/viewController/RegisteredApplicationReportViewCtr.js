Ext.define('Admin.view.summaryreport.registeredapplicationreport.viewControllers.RegisteredApplicationReportViewCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.registeredapplicationreportviewctr',
   

    init: function () {
    
    },
    generateProductApplicationQueryLetter: function (item) {
      var record = item.getWidgetRecord(),
          query_ref_id = record.get('query_ref_id'),
          module_id = record.get('module_id'),
          sub_module_id = record.get('sub_module_id'),
          product_id = record.get('product_id'),
          application_code = record.get('application_code');
          var report_url = 'reports/printProductQueryLetter?application_code='+application_code+"&module_id="+module_id+"&sub_module_id="+sub_module_id+"&product_id="+product_id+"&query_ref_id="+query_ref_id+"&table_name=tra_product_applications";
          print_report(report_url);
          
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


func_Search:function(me) {
     var grid=me.up('grid'),
         store=grid.getStore();
      store.reload();
   },
    
    addAllToCombo:function(combo,r,e,d) {
            var store=combo.combo.getStore();
            var all={name: 'All',id:0};
            store.insert(0, all);
          },
    pickFirstEntryOnCombo:function(combo) {
      console.log(combo.getStore().getAt(1));
           combo.setValue(combo.getStore().getAt(0));
          },


          func_QueriedRefreshGridReportFilters:function(btn){
            var  form = btn.up('form'),
               pnl = form.up('panel'),
               grid = pnl.down('grid'),
               store = grid.getStore();

               store.load();
          },
func_RefreshGridReportFilters: function(btn) {
    var  form = btn.up('form'),
         pnl = form.up('panel'),
         to_combo = form.down('datefield[name = to_date]').getValue(),
         from_combo = form.down('datefield[name = from_date]').getValue(),
         registration_date = form.down('combo[name = registration_date]').getValue(),
         approval_opt = form.down('combo[name = approval_opt]').getValue(),
         expiry_date = form.down('combo[name = expiry_date]').getValue(),
         gridPnl = pnl.down('registeredApplicationReportPnl'),
         gridcounterStr = pnl.down('registeredapplicationcountergrid').getStore(),
         gridallStr = pnl.down('registeredApplicationsGrid').getStore();

    if(registration_date || approval_opt || expiry_date){
      if(to_combo && from_combo){
        gridallStr.removeAll();
        gridallStr.reload();
        gridcounterStr.removeAll();
        gridcounterStr.reload();
      }else{
      Ext.Msg.alert('Notice', 'please choose a to and from date for the selected date option(s)');
      }
    }else{
      if(!to_combo && !from_combo){
        gridallStr.removeAll();
        gridallStr.reload();
        gridcounterStr.removeAll();
        gridcounterStr.reload();
      }else{
        gridallStr.removeAll();
        gridallStr.reload();
        gridcounterStr.removeAll();
        gridcounterStr.reload();
        //alert
        toastr.warning('The To and from dates will not be consindered in this filtering since no date option have been provided!!', 'Filter Notice');
      }
    }
        
    
 }

});