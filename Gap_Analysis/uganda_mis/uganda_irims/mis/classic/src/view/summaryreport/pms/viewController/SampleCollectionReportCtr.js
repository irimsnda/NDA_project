Ext.define('Admin.view.summaryreport.pms.viewControllers.SampleCollectionReportCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.samplecollectionreportCtr',

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
   
   func_LoadCollectedSamplesFilters:function(btn) {
     var form=btn.up('form'),
       panel = form.up('panel'),
       gridStr=panel.down('grid').getStore();
    
            gridStr.removeAll();
            gridStr.load();
        
     
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
   func_clear: function(btn) {
     var form =btn.up('form');
         
     form.reset();

     
   },
   exportDetailedReport: function(btn) {
        var record = btn.getWidgetRecord(),
            pms_plan_id = record.get('pms_plan_id');

    print_report('summaryreport/ExportPmsReport?pms_plan_id='+pms_plan_id);
     
   },
   exportManufacturerDetailedReport: function(btn) {
     var record = btn.getWidgetRecord(),
            manufacturer_id = record.get('manufacturer_id');

    print_report('summaryreport/ExportPmsManufacturerReport?manufacturer_id='+manufacturer_id);
     
   },
   func_refreshGrid: function(btn) {
     var form = btn.up('form'),
         store = form.up('grid').getStore();
      store.removeAll();
      store.load();
   },
   printPMSZonalReport: function(btn){
     var grid=btn.up('grid'),
        zone_id = grid.down('combo[name=zone_id]').getValue(),
        region_id = grid.down('combo[name=region_id]').getValue(),
        from_date = grid.down('datefield[name=from_date]').getValue(),
        to_date = grid.down('datefield[name=to_date]').getValue(),
        classification_id = grid.down('combo[name=classification_id]').getValue(),
        filterfield = grid.getPlugin('filterfield'),
        filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config'),
        filter = Ext.JSON.encode(filter_array);
        from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
        print_report('summaryreport/printPMSZonalReport?filter='+encodeURIComponent(filter)+'&zone_id='+zone_id+'&region_id='+region_id+'&from_date='+from_date+'&to_date='+to_date+'&classification_id='+classification_id);

   }
});