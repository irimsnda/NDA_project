Ext.define('Admin.view.summaryreport.registration.viewControllers.RegistrationReportViewCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.registrationreportviewctr',
   

    init: function () {
    
    },
//graphs
    onAxisLabelRender: function (axis, label, layoutContext) {
        var value = layoutContext.renderer(label);
        return value === 0 ? '0' : Ext.util.Format.number(value);
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
    
    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value);
    },
    func_QueriedRefreshGridReportFilters:function(btn){
      var  form = btn.up('form'),
         pnl = form.up('panel'),
         grid = pnl.down('grid'),
         store = grid.getStore();

         store.load();
    },
    onGridColumnRender: function (v) {
        return Ext.util.Format.number(v);
    },
    //end of graphs

    
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
   loadBusinessTypeCombo: function(me,newValue, oldValue, eOpts) {
     var form = me.up('form'),
          business_typeStr=form.down('combo[name=business_type_id]').getStore();

          business_typeStr.load({params:{filters:JSON.stringify({'section_id':newValue})}});

   },
   func_setImportTypeCategory: function(me,newValue,oldValue,eOpts) {
     var form = me.up('form'),
          type_categoryStr=form.down('combo[name=type_category]').getStore();

          type_categoryStr.load({params:{filters:JSON.stringify({'section_id':newValue})}});
   },
   loadSectionCombo(me,newValue,oldValue,eOpts){
     var form=me.up('form'),
          sectionStr=form.down('combo[name=section_id]').getStore();

          sectionStr.load({params:{filters:JSON.stringify({'directorate_id':newValue})}});
   },
   func_toggleExportBtn(combo, newValue, old, eopt){
    var form=combo.up('form'),
        btn=form.down('button[name=DetailedExport]');    
    if(newValue==0){
        btn.setDisabled(true);
    }else{
      btn.setDisabled(false);
    }
   },
   
  func_setStore: function(me,options){
      var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.common.CommonGridAbstractStore', config);
         me.setStore(store); 
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

   func_ExpWinShow: function(item) {

         var me = this,
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            child = Ext.widget(childXtype);
            console.log('beforeLoad');
            //filters transfer to the new win
           var grid = item.up('form');
           child.down('textfield[name=sub_module_id]').setValue(grid.down('combo[name=sub_module_id]').getValue());
           child.down('textfield[name=from_date]').setValue(grid.down('datefield[name=from_date]').getValue());
           child.down('datefield[name=to_date]').setValue(grid.down('datefield[name=to_date]').getValue());
           child.down('textfield[name=received_opt]').setValue(grid.down('combo[name=received_opt]').getValue());
           child.down('textfield[name=evaluation_opt]').setValue(grid.down('combo[name=evaluation_opt]').getValue());
           child.down('textfield[name=section_id]').setValue(grid.down('combo[name=section_id]').getValue());
           child.down('textfield[name=zone_id]').setValue(grid.down('combo[name=zone_id]').getValue());
           child.down('textfield[name=classification_process]').setValue(grid.down('combo[name=classification_process]').getValue());
           child.down('textfield[name=directorate_id]').setValue(grid.down('combo[name=directorate_id]').getValue());
           child.down('textfield[name=grid]').setValue(item.xspreadsheet);
           

           if(item.module=='premiseWin'){
             child.down('textfield[name=premise_type]').setValue(grid.down('combo[name=premise_type_id]').getValue());
             child.down('textfield[name=business_scale]').setValue(grid.down('combo[name=business_scale_id]').getValue());
             child.down('textfield[name=business_type]').setValue(grid.down('combo[name=business_type_id]').getValue());
           }
           if(item.module=='productWin'){
             child.down('textfield[name=product_type]').setValue(grid.down('combo[name=product_type]').getValue());
             child.down('textfield[name=product_class_category]').setValue(grid.down('combo[name=product_class_category]').getValue());
             child.down('textfield[name=classification_category]').setValue(grid.down('combo[name=classification_category]').getValue());
             child.down('textfield[name=device_type_id]').setValue(grid.down('combo[name=device_type_id]').getValue());
           }
           if(item.module=='gmpWin'){
             child.down('textfield[name=facility_location]').setValue(grid.down('combo[name=facility_location]').getValue());
              }
            if(item.module=='clinicaltrialWin'){
             child.down('textfield[name=clinical_category]').setValue(grid.down('combo[name=clinical_category]').getValue());
              }
             if(item.module=='importexportWin'){
             child.down('textfield[name=type_category]').setValue(grid.down('combo[name=type_category]').getValue());
              }
              if(item.module=='promadvertWin'){
             child.down('textfield[name=classification_id]').setValue(grid.down('combo[name=classification_id]').getValue());
              }
               
             
          //setting the print options
          var dPrint=child.down('button[name=detailed]');
              dPrint.xFileName=item.xFileName;
              dPrint.xPrintFunc=item.xPrintFunc;
              dPrint.xspreadsheet=item.xspreadsheet;
              dPrint.xheading=item.xheading;

          // var fPrint= child.down('button[name=filtered]');
          //     fPrint.xFileName=item.xFileName;
          //     fPrint.xPrintFunc=item.xPrintFunc;
          //     fPrint.xspreadsheet=item.xspreadsheet;
          //     fPrint.xheading=item.xheading;

        //adding components to the window
         var center = Ext.create({
                     xtype: item.xspreadsheet,
                     region: 'center',
                     bbar: [
                            {
                            xtype: 'pagingtoolbar',
                            width: '100%',
                            displayInfo: true,
                            displayMsg: 'Showing {0} - {1} out of {2}',
                            emptyMsg: 'No Records'
                            //beforeLoad: 'fun_loadExportWinStoreReload'
                          
                              
                      }]
                 });
         var storeConfig = {
                 proxy: {
                    url: 'summaryreport/test',
                   }
              };
        store = Ext.create('Admin.store.summaryreport.ReportsGlobalAbstractStr', storeConfig);
         center.down('pagingtoolbar').setStore(store);
         center.setStore(store);
         // var cols = center.getColumns();
         //       cols[1].filter.setVisible(false);

          var west = Ext.create({
                     xtype: item.xvisibleColumns,
                     region: 'west',
                     width: 200
                 });

           child.add(center);
           child.add(west);

          //hide the action column of the grid
          var x=child.down(item.xspreadsheet),
              y=x.getView().grid;
              y.columns[0].setVisible(0);

         //display window
         funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
   
    
  },

  fun_loadExportWinStoreReload: function(btn) {
          var sub_module_id = btn.down('textfield[name=sub_module_id]').getValue(),
           section_id = btn.down('textfield[name=section_id]').getValue(),
           directorate_id = btn.down('textfield[name=directorate_id]').getValue(),
           received_opt = btn.down('textfield[name=received_opt]').getValue(),
           evaluation_opt = btn.down('textfield[name=evaluation_opt]').getValue(),
           from_date = btn.down('datefield[name=from_date]').getValue(),
           module_name = btn.down('textfield[name=module_name]').getValue(),
           zone_id = btn.down('textfield[name=zone_id]').getValue(),
           classification_process = btn.down('textfield[name=classification_process]').getValue(),
           action_url = btn.down('textfield[name=action_url]').getValue(),
           to_date = btn.down('datefield[name=to_date]').getValue();

          if(module_name=="premise"){
                     var premise_type = btn.down('textfield[name=premise_type]').getValue(),
                         business_scale = btn.down('textfield[name=business_scale]').getValue(),
                         business_type = btn.down('textfield[name=business_type]').getValue();

                     var Originalfilter = {'zone_id':zone_id,'t1.section_id':section_id,'classification_process':classification_process,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'business_type':business_type,'business_scale':business_scale, 'premise_type':premise_type};
                      var filters = JSON.stringify(Originalfilter);
                  }
           if(module_name=="product"){
                     var product_type = btn.down('textfield[name=product_type]').getValue(),
                     classification = btn.down('textfield[name=classification_category]').getValue();
                     product_class_category = btn.down('textfield[name=product_class_category]').getValue();
                     device_type_id = btn.down('textfield[name=device_type_id]').getValue();

         var Originalfilter = { 'zone_id': zone_id, 't1.section_id': section_id, 'classification_process': classification_process, 'directorate_id': directorate_id, 't1.sub_module_id': sub_module_id, 'from_date': from_date, 'to_date': to_date, 'receivedOpt': received_opt, 'evaluation_opt': evaluation_opt, 'classification_category': classification, 'product_type': product_type, 'product_class_category': product_class_category, 'device_type_id': device_type_id };
                      var filters = JSON.stringify(Originalfilter);
                  }
            if(module_name=="gmp"){
                     var facility_location = btn.down('textfield[name=facility_location]').getValue();

                     var Originalfilter = {'zone_id':zone_id,'t1.section_id':section_id,'classification_process':classification_process,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'facility_location':facility_location};
                      var filters = JSON.stringify(Originalfilter);
                  }
            if(module_name=="clinicaltrial"){
                     var clinical_category = btn.down('textfield[name=clinical_category]').getValue();

                     var Originalfilter = {'zone_id':zone_id,'t1.section_id':section_id,'classification_process':classification_process,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'clinical_category':clinical_category};
                      var filters = JSON.stringify(Originalfilter);
                  }
            if(module_name=="importexport"){
                     var type_category = btn.down('textfield[name=type_category]').getValue();

                     var Originalfilter = {'zone_id':zone_id,'t1.section_id':section_id,'classification_process':classification_process,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'type_category':type_category};
                      var filters = JSON.stringify(Originalfilter);
                  }
            if(module_name=="promadvert"){
                     var classification_id = btn.down('textfield[name=classification_id]').getValue();

                     var Originalfilter = {'zone_id':zone_id,'t1.section_id':section_id,'classification_process':classification_process,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'classification_id':classification_id};
                      var filters = JSON.stringify(Originalfilter);
                  }
            if(module_name=="disposal"){
                     var Originalfilter = {'zone_id':zone_id,'t1.section_id':section_id,'classification_process':classification_process,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt};
                      var filters = JSON.stringify(Originalfilter);
                  }
          
          var store = btn.down('pagingtoolbar').store;
           store.getProxy().url = 'summaryreport/'+action_url;
         // store.setRemoteFilter(false);
          store.load({params:{
            'filters':filters,
            'process_class':classification_process
          }});


          //disable filters
          var spreadsheetGrid=btn.down('grid'),
              storeGrid = spreadsheetGrid.getStore();
          var t=spreadsheetGrid.down('headercontainer').getGridColumns();

                 for (var i = t.length - 1; i >= 2; i--) {
                      column=t[i];
                      if(column.down('textfield')){
                        var textfield=column.down('textfield');

                        textfield.disable(true);
                      }
                      // if(textfield!=null){
                      //    textfield.setValue('');
                      // }

                      //spreadsheetGrid = column.up('grid');
                      storeGrid.removeFilter(column.filter.property || column.dataIndex);
                     // column.setText(column.textEl.dom.firstElementChild.innerText);
                 
                   }
  },


  func_showhideSpreasheetColumn: function (chk, value) {
          var  chk_name = chk.name;
          var name=chk.up('form'),
              con=name.up('form'),
              grid=con.down('textfield[name=grid]').getValue();
              var grid=Ext.ComponentQuery.query(grid);

          grid[0].columns[chk_name].setVisible(value);
            },    
 
    func_LoadreportFilters: function (btn) {
        
           var grid = btn.up('form'),
           sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
           product_class_category = grid.down('combo[name=product_class_category]').getValue(),
           section_id = grid.down('combo[name=section_id]').getValue(),
           directorate_id = grid.down('combo[name=directorate_id]').getValue(),
           classification_category = grid.down('combo[name=classification_category]').getValue(),
           product_type = grid.down('combo[name=product_type]').getValue(),
           received_opt = grid.down('combo[name=received_opt]').getValue(),
           evaluation_opt = grid.down('combo[name=evaluation_opt]').getValue(),
           
           zone_id = grid.down('combo[name=zone_id]').getValue(),
           from_date = grid.down('datefield[name=from_date]').getValue(),
           to_date = grid.down('datefield[name=to_date]').getValue();

           var panel=grid.up('form'),
           gridStr= panel.down('grid').getStore(),
           cartesianStr=panel.down('cartesian').getStore();

          // var con=panel.up('form'),
           module_id=panel.down('hiddenfield[name=module_id]').getValue();
        

          Ext.getBody().mask('Filtering Please wait...');

          //reload all stores
          if(cartesianStr.getTotalCount()>0){
               var panelStores = [gridStr, cartesianStr];
             }else{
              var panelStores = [gridStr];
             }

         Ext.each(panelStores, function(eachStore) {
         var store = Ext.getStore(eachStore);
         
            if(store){
              store.removeAll();
                store.load({
                  params:{
                                sub_module_id:sub_module_id,
                                module_id: module_id,
                                section_id: section_id,
                                directorate_id: directorate_id,
                                classification_category: classification_category,
                                product_type: product_type,
                                from_date: from_date,
                                received_opt: received_opt,
                                evaluation_opt: evaluation_opt,
                                to_date: to_date,
                                product_class_category: product_class_category

                        },
                  callback: function(records, operation, success) {
                          Ext.getBody().unmask();
                        }
                      });
            }
       })
                       
    },
   
func_LoadPremiseReportFilters: function (btn) {
        
          // console.log(btn.up('form'));
           var grid = btn.up('form'),
           sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
           business_type = grid.down('combo[name=business_type_id]').getValue(),
           section_id = grid.down('combo[name=section_id]').getValue(),
           directorate_id = grid.down('combo[name=directorate_id]').getValue(),
           business_scale = grid.down('combo[name=business_scale_id]').getValue(),
           zone_id = grid.down('combo[name=zone_id]').getValue(),
           premise_type = grid.down('combo[name=premise_type_id]').getValue(),
           received_opt = grid.down('combo[name=received_opt]').getValue(),
           evaluation_opt = grid.down('combo[name=evaluation_opt]').getValue(),
           from_date = grid.down('datefield[name=from_date]').getValue(),
           to_date = grid.down('datefield[name=to_date]').getValue();

           var panel=grid.up('form'),
           gridStr= panel.down('grid').getStore(),
           cartesianStr=panel.down('cartesian').getStore();

          // var con=panel.up('form'),
           module_id=grid.down('hiddenfield[name=module_id]').getValue();
        

          Ext.getBody().mask('Filtering Please wait...');

          //reload all stores//reload all stores
          if(cartesianStr.getTotalCount()>0){
               var panelStores = [gridStr, cartesianStr];
             }else{
              var panelStores = [gridStr];
             }

         Ext.each(panelStores, function(eachStore) {
         var store = Ext.getStore(eachStore);
            if(store){
                store.removeAll();
                store.load({
                  params:{
                                sub_module_id:sub_module_id,
                                module_id: module_id,
                                section_id: section_id,
                                directorate_id: directorate_id,
                                business_scale: business_scale,
                                premise_type: premise_type,
                                from_date: from_date,
                                received_opt: received_opt,
                                evaluation_opt: evaluation_opt,
                                to_date: to_date,
                                zone_id:zone_id,
                                business_type: business_type

                        },
                  callback: function(records, operation, success) {
                          Ext.getBody().unmask();
                        }
                      });
            }
       });
                       
    },

    func_LoadPromAdvertReportFilters: function (btn) {
        
          // console.log(btn.up('form'));
           var grid = btn.up('form'),
           sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
           section_id = grid.down('combo[name=section_id]').getValue(),
           
           zone_id = grid.down('combo[name=zone_id]').getValue(),
           directorate_id = grid.down('combo[name=directorate_id]').getValue(),
           classification_id = grid.down('combo[name=classification_id]').getValue(),
           received_opt = grid.down('combo[name=received_opt]').getValue(),
           evaluation_opt = grid.down('combo[name=evaluation_opt]').getValue(),
           from_date = grid.down('datefield[name=from_date]').getValue(),
           to_date = grid.down('datefield[name=to_date]').getValue();

           var panel=grid.up('form'),
           gridStr= panel.down('grid').getStore(),
           cartesianStr=panel.down('cartesian').getStore();

           var con=panel.up('form'),
           module_id=panel.down('hiddenfield[name=module_id]').getValue();
        


          Ext.getBody().mask('Filtering Please wait...');
          //reload all stores
          if(cartesianStr.getTotalCount()>0){
               var panelStores = [gridStr, cartesianStr];
             }else{
              var panelStores = [gridStr];
             }
             
         Ext.each(panelStores, function(eachStore) {
         var store = Ext.getStore(eachStore);
        
            if(store){
               store.removeAll();
                store.load({
                  params:{
                                sub_module_id:sub_module_id,
                                module_id: module_id,
                                section_id: section_id,
                                directorate_id: directorate_id,
                                classification_id: classification_id,
                                from_date: from_date,
                                zone_id:zone_id,
                                received_opt: received_opt,
                                evaluation_opt: evaluation_opt,
                                to_date: to_date

                        },
                  callback: function(records, operation, success) {
                          Ext.getBody().unmask();
                        }
                      });
            }
       })
                       
    },

    func_LoadGmpReportFilters: function (btn) {
        
          // console.log(btn.up('form'));
           var grid = btn.up('form'),
           sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
           facility_location = grid.down('combo[name=facility_location]').getValue(),
           directorate_id = grid.down('combo[name=directorate_id]').getValue(),
           section_id = grid.down('combo[name=section_id]').getValue(),
           received_opt = grid.down('combo[name=received_opt]').getValue(),
           evaluation_opt = grid.down('combo[name=evaluation_opt]').getValue(),
           
           zone_id = grid.down('combo[name=zone_id]').getValue(),
           from_date = grid.down('datefield[name=from_date]').getValue(),
           to_date = grid.down('datefield[name=to_date]').getValue();

           var panel=grid.up('form'),
           gridStr= panel.down('grid').getStore(),
           cartesianStr=panel.down('cartesian').getStore();

          // var con=panel.up('form'),
           module_id=grid.down('hiddenfield[name=module_id]').getValue();
          
          //reload all stores
          if(cartesianStr.getTotalCount()>0){
               var panelStores = [gridStr, cartesianStr];
             }else{
              var panelStores = [gridStr];
             }
             
         Ext.each(panelStores, function(eachStore) {
         var store = Ext.getStore(eachStore);
         
            if(store){
              store.removeAll();
                store.load({
                  params:{
                                sub_module_id:sub_module_id,
                                module_id: module_id,
                                directorate_id: directorate_id,
                                section_id: section_id,
                                facility_location: facility_location,
                                from_date: from_date,
                                received_opt: received_opt,
                                evaluation_opt: evaluation_opt,
                                zone_id:zone_id,
                                to_date: to_date

                        },
                  callback: function(records, operation, success) {
                          Ext.getBody().unmask();
                        }
                      });
            }
       })
                       
    },

    func_LoadClinicalTrialReportFilters: function (btn) {
        
          // console.log(btn.up('form'));
           var grid = btn.up('form'),
           sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
           clinical_category = grid.down('combo[name=clinical_category]').getValue(),
           directorate_id = grid.down('textfield[name=directorate_id]').getValue(),
           section_id = grid.down('textfield[name=section_id]').getValue(),
           
           zone_id = grid.down('textfield[name=zone_id]').getValue(),
           received_opt = grid.down('textfield[name=received_opt]').getValue(),
           evaluation_opt = grid.down('textfield[name=evaluation_opt]').getValue(),
           from_date = grid.down('datefield[name=from_date]').getValue(),
           to_date = grid.down('datefield[name=to_date]').getValue();

           var panel=grid.up('form'),
           gridStr= panel.down('grid').getStore(),
           cartesianStr=panel.down('cartesian').getStore();

         //  var con=panel.up('form'),
           module_id=grid.down('hiddenfield[name=module_id]').getValue();
        


          Ext.getBody().mask('Filtering Please wait...');
          //reload all stores
          if(cartesianStr.getTotalCount()>0){
               var panelStores = [gridStr, cartesianStr];
             }else{
              var panelStores = [gridStr];
             }
             
         Ext.each(panelStores, function(eachStore) {
         var store = Ext.getStore(eachStore);
        
            if(store){
               store.removeAll();
                store.load({
                  params:{
                                sub_module_id:sub_module_id,
                                module_id: module_id,
                                directorate_id: directorate_id,
                                section_id: section_id,
                                clinical_category: clinical_category,
                                from_date: from_date,
                                received_opt: received_opt,
                                evaluation_opt: evaluation_opt,
                                to_date: to_date

                        },
                  callback: function(records, operation, success) {
                    console.log(success);
                          Ext.getBody().unmask();
                        }
                      });
            }
       })
                       
    },
    func_LoadImportExportReportFilters: function (btn) {
        
          // console.log(btn.up('form'));
           var grid = btn.up('form'),
           sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
           type_category = grid.down('combo[name=type_category]').getValue(),
           directorate_id = grid.down('combo[name=directorate_id]').getValue(),
           section_id = grid.down('combo[name=section_id]').getValue(),
           received_opt = grid.down('combo[name=received_opt]').getValue(),
           
           zone_id = grid.down('combo[name=zone_id]').getValue(),
           evaluation_opt = grid.down('combo[name=evaluation_opt]').getValue(),
           from_date = grid.down('datefield[name=from_date]').getValue(),
           to_date = grid.down('datefield[name=to_date]').getValue();

           var panel=grid.up('form'),
           gridStr= panel.down('grid').getStore(),
           cartesianStr=panel.down('cartesian').getStore();

         //  var con=panel.up('form'),
           module_id=grid.down('hiddenfield[name=module_id]').getValue();
        

Ext.getBody().mask('Filtering Please wait...');


          //reload all stores
          if(cartesianStr.getTotalCount()>0){
               var panelStores = [gridStr, cartesianStr];
             }else{
              var panelStores = [gridStr];
             }
             
         Ext.each(panelStores, function(eachStore) {
         var store = Ext.getStore(eachStore);
            if(store){
              store.removeAll();
                store.load({
                  params:{
                                sub_module_id:sub_module_id,
                                module_id: module_id,
                                section_id: section_id,
                                directorate_id: directorate_id,
                                type_category: type_category,
                                from_date: from_date,
                                received_opt: received_opt,
                                zone_id:zone_id,
                                evaluation_opt: evaluation_opt,
                                to_date: to_date

                        },
                  callback: function(records, operation, success) {
                          Ext.getBody().unmask();
                        }
                      });
            }
       })
                       
    },

    func_LoadDisposalReportFilters: function (btn) {
        
          // console.log(btn.up('form'));
           var grid = btn.up('form'),
           sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
           directorate_id = grid.down('combo[name=directorate_id]').getValue(),
           
           zone_id = grid.down('combo[name=zone_id]').getValue(),
           section_id = grid.down('combo[name=section_id]').getValue(),
           received_opt = grid.down('textfield[name=received_opt]').getValue(),
           evaluation_opt = grid.down('textfield[name=evaluation_opt]').getValue(),
           from_date = grid.down('datefield[name=from_date]').getValue(),
           to_date = grid.down('datefield[name=to_date]').getValue();

           var panel=grid.up('form'),
           gridStr= panel.down('grid').getStore(),
           cartesianStr=panel.down('cartesian').getStore();

           //var con=panel.up('form'),
           module_id=grid.down('hiddenfield[name=module_id]').getValue();
        

          Ext.getBody().mask('Filtering Please wait...');
          //reload all stores
          if(cartesianStr.getTotalCount()>0){
               var panelStores = [gridStr, cartesianStr];
             }else{
              var panelStores = [gridStr];
             }
             
         Ext.each(panelStores, function(eachStore) {
         var store = Ext.getStore(eachStore);
            if(store){
              store.removeAll();
                store.load({
                  params:{
                                sub_module_id:sub_module_id,
                                module_id: module_id,
                                section_id: section_id,
                                directorate_id: directorate_id,
                                from_date: from_date,
                                received_opt: received_opt,
                                zone_id:zone_id,
                                evaluation_opt: evaluation_opt,
                                to_date: to_date

                        },
                  callback: function(records, operation, success) {
                          Ext.getBody().unmask();
                        }

                      });
            }
       })
                       
    },



    func_exportSummaryReport: function (btn) {
                 var filter_array='';
                 var name=btn.name,
                     xPrintFunc=btn.xPrintFunc,
                     xFileName=btn.xFileName;

                 var elem = btn.up('form'),
                   grid=elem.down(btn.xspreadsheet),
                   sub_module_id = elem.down('textfield[name=sub_module_id]').getValue(),
                   section_id = elem.down('textfield[name=section_id]').getValue(),
                   directorate_id = elem.down('textfield[name=directorate_id]').getValue(),
                   received_opt = elem.down('textfield[name=received_opt]').getValue(),
                   evaluation_opt = elem.down('textfield[name=evaluation_opt]').getValue(),
                   to_date = elem.down('datefield[name=to_date]').getValue(),
                   from_date = elem.down('datefield[name=from_date]').getValue(),
                   process_class = elem.down('textfield[name=classification_process]').getValue(),
                   filterfield = grid.getPlugin('filterfield');
                   
                  if(btn.module=="premise"){
                     var premise_type = elem.down('textfield[name=premise_type]').getValue(),
                         business_scale = elem.down('textfield[name=business_scale]').getValue(),
                         business_type = elem.down('textfield[name=business_type]').getValue();

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'business_type':business_type,'business_scale':business_scale, 'premise_type':premise_type};
                      var filters = JSON.stringify(Originalfilter);
                  }
                  if(btn.module=="product"){
                     var product_type = elem.down('textfield[name=product_type]').getValue(),
                     classification = elem.down('textfield[name=classification_category]').getValue();
                      product_class_category = elem.down('textfield[name = product_class_category]').getValue();
                      device_type_id = elem.down('textfield[name = device_type_id]').getValue();
            var Originalfilter = { 't1.section_id': section_id, 'directorate_id': directorate_id, 't1.sub_module_id': sub_module_id, 'from_date': from_date, 'to_date': to_date, 'receivedOpt': received_opt, 'evaluation_opt': evaluation_opt, 'classification_category': classification, 'product_type': product_type, 'product_class_category': product_class_category, 'device_type_id': device_type_id };
                      var filters = JSON.stringify(Originalfilter);
                  }
                  if(btn.module=="gmp"){
                     var facility_location = elem.down('textfield[name=facility_location]').getValue();

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'facility_location':facility_location};
                      var filters = JSON.stringify(Originalfilter);
                  }

                  if(btn.module=="clinicaltrial"){
                     var clinical_category = elem.down('textfield[name=clinical_category]').getValue();

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'clinical_category':clinical_category};
                      var filters = JSON.stringify(Originalfilter);
                  }
                   if(btn.module=="importexport"){
                     var type_category = elem.down('textfield[name=type_category]').getValue();

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'type_category':type_category};
                      var filters = JSON.stringify(Originalfilter);
                  }
                  if(btn.module=="promadvert"){
                     var classification_id = elem.down('textfield[name=classification_id]').getValue();

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'classification_id':classification_id};
                      var filters = JSON.stringify(Originalfilter);
                  }
                  if(btn.module=="disposal"){

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt};
                      var filters = JSON.stringify(Originalfilter);
                  }
                   if(name=='filtered'){
                  //filters
                     var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
                    }

                      // //existing filters
                      // var Originalfilter = {'t1.section_id':section_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'classification_id':classification, 'product_type':product_type};
                      // var filters = JSON.stringify(Originalfilter);

                   //headers
                   var header=Ext.pluck(grid.query('gridcolumn:not([hidden])'), 'name');
                   var header2=[];
                   var x=0;
                   for (var i = 0; i <= header.length; i++) {
                    header2[x]= header[i];
                     x++;
                   }
                 
                   var header=header2;
                  // var header= Ext.encode(header2);
                   console.log(JSON.stringify(convert_object(header)));
                   console.log(convert_object(header));

                   filter_array = Ext.JSON.encode(filter_array);
                    // Ext.Ajax.request({
                    //   url: 'openoffice/exportall',
                    //   method: 'POST',
                //  Ext.create('Ext.form.Panel', {
                //     renderTo: Ext.getBody(),
                //     standardSubmit: true,
                //     method: 'GET',
                //     url: 'summaryreport/exportDefinedColumnData'
                // }).submit({
                //       params : {
                //                   'header':header,
                //                   'filters':filters,
                //                   'process_class':process_class,
                //                   'filter':filter_array,
                //                   'function':xPrintFunc,'filename':xFileName,'headingText': btn.xheading


                //     },
               
                      
                        // success: function (form, response) {
                        //   print_report(response);
                        // }
                      //   var t = JSON.parse(response.responseText);
                      //   var a = document.createElement("a");
                      //   a.href = t.file; 
                      //   a.download = t.name;
                      //   document.body.appendChild(a);

                      //   a.click();
                     
                      //   a.remove();
      
                      // },
                      // failure: function(conn, response, options, eOpts) {
                      //      Ext.Msg.alert('Error', 'please try again');
                      // }});
                   // });
            print_report('summaryreport/exportDefinedColumnData?header='+encodeURIComponent(JSON.stringify(header))+'&filters='+encodeURIComponent(filters)+'&process_class='+process_class+'&filter='+encodeURIComponent(JSON.stringify(filter_array))+'&function='+xPrintFunc+'&filename='+xFileName+'&headingText='+btn.xheading);

             },
  func_exportHeaderlessReport: function (btn) {
                 var filter_array='';
                 var name=btn.name,
                     xPrintFunc=btn.xPrintFunc,
                     xFileName=btn.xFileName;

                 var elem = btn.up('form'),
                   sub_module_id = elem.down('combo[name=sub_module_id]').getValue(),
                   module_id = elem.down('hiddenfield[name=module_id]').getValue(),
                   section_id = elem.down('combo[name=section_id]').getValue(),
                   directorate_id = elem.down('combo[name=directorate_id]').getValue(),
                   received_opt = elem.down('combo[name=received_opt]').getValue(),
                   evaluation_opt = elem.down('combo[name=evaluation_opt]').getValue(),
                   
                   zone_id = elem.down('combo[name=zone_id]').getValue(),
                   to_date = elem.down('datefield[name=to_date]').getValue(),
                   from_date = elem.down('datefield[name=from_date]').getValue(),
                   process_class = elem.down('combo[name=classification_process]').getValue();
                   
                  if(btn.module=="premise"){
                     var premise_type = elem.down('combo[name=premise_type_id]').getValue(),
                         business_scale = elem.down('combo[name=business_scale_id]').getValue(),
                         business_type = elem.down('combo[name=business_type_id]').getValue();

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'business_type':business_type,'business_scale':business_scale, 'zone_id':zone_id, 'premise_type':premise_type};
                      var filters = JSON.stringify(Originalfilter);
                  }
                  if(btn.module=="product"){
            var product_type = elem.down('combo[name=product_type]').getValue(),
              product_class_category = elem.down('combo[name=product_class_category]').getValue(),
              classification_id = elem.down('combo[name=classification_category]').getValue(),
              device_type_id = elem.down('combo[name=device_type_id]').getValue();

            var Originalfilter = { 't1.section_id': section_id, 'directorate_id': directorate_id, 't1.sub_module_id': sub_module_id, 'from_date': from_date, 'to_date': to_date, 'receivedOpt': received_opt, 'evaluation_opt': evaluation_opt, 'classification_id': classification_id, 'product_type': product_type, 'zone_id': zone_id, 'product_class_category': product_class_category, 'device_type_id': device_type_id};
                      var filters = JSON.stringify(Originalfilter);
                  }
                  if(btn.module=="gmp"){
                     var facility_location = elem.down('combo[name=facility_location]').getValue();

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'zone_id':zone_id, 'facility_location':facility_location};
                      var filters = JSON.stringify(Originalfilter);
                  }

                  if(btn.module=="clinicaltrial"){
                     var clinical_category = elem.down('combo[name=clinical_category]').getValue();

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'zone_id':zone_id, 'clinical_category':clinical_category};
                      var filters = JSON.stringify(Originalfilter);
                  }
                   if(btn.module=="importexport"){
                     var type_category = elem.down('combo[name=type_category]').getValue();

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'evaluation_opt':evaluation_opt, 'zone_id':zone_id};
                      var filters = JSON.stringify(Originalfilter);
                  }
                   if(btn.module=="promadvert"){
                     var classification_id = elem.down('combo[name=classification_id]').getValue();

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt, 'zone_id':zone_id, 'classification_id':classification_id};
                      var filters = JSON.stringify(Originalfilter);
                  }
                 if(btn.module=="disposal"){

                     var Originalfilter = {'t1.section_id':section_id,'directorate_id':directorate_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'zone_id':zone_id,'receivedOpt':received_opt,'evaluation_opt':evaluation_opt};
                      var filters = JSON.stringify(Originalfilter);
                  }
                   
                // Ext.create('Ext.form.Panel', {
                //     renderTo: Ext.getBody(),
                //     standardSubmit: true,
                //     method: 'GET',
                //     url: 'summaryreport/exportData'
                // }).submit({
                //       params : {
                //                   'filters':filters,
                //                   'process_class':process_class,
                //                   'module_id':module_id,
                //                   'function':xPrintFunc,
                //                   'filename':xFileName,
                //                   'headingText': btn.xheading


                //     },
                //     });
        
print_report('summaryreport/exportData?filters='+encodeURIComponent(filters)+'&process_class='+process_class+'&module_id='+module_id+'&function='+xPrintFunc+'&filename='+xFileName+'&headingText='+btn.xheading);

             },
  func_ageAnalysisAfterRender:function(me){
                //add columns to grid dynamically
                var grid = me,
                    panel=grid.up('panel'),
                    module_id=panel.down('hiddenfield[name=module_id]').getValue();
                    store=Ext.getStore('ageAnalysisDateSpanStr');

                    var filter={'module_id':module_id,'is_enabled':1};
                    var filters=JSON.stringify(filter);
                    store.load({
                      params:{
                        filters:filters,
                        table_name: 'par_ageanalysisdays_span'
                          },

                        callback: function(records, operation, success) {
                            var sorter=[{direction: 'DESC',property: 'order_no'}];
                           store.setSorters(sorter);
                           store.each(function(record,idx){

                            if(record.data['max_days']!=0){
                                  var column = Ext.create('Ext.grid.column.Column', {
                                          text: record.data['min_days']+' - '+ record.data['max_days'],
                                          dataIndex: record.data['order_no']+' ',
                                          flex: 1,
                                          summaryType: 'sum',
                                          summaryRenderer: function(value){
                                               return(value);
                                            },
                                      });
                            }else{
                                 var column = Ext.create('Ext.grid.column.Column', {
                                        text: record.data['min_days']+'>',
                                        dataIndex: record.data['order_no']+' ',
                                        flex: 1,
                                        summaryType: 'sum',
                                        summaryRenderer: function(value){
                                               return(value);
                                            },
                                    });
                              }
           
                          grid.headerCt.insert(
                              grid.columns.length-1, 
                              column);
                          });
                      
                        
                           }
                          });  
            //load sub module store
            var combo=grid.down('combo[name=sub_module_id]'),
                comboStr=combo.getStore();
            filter={'module_id':module_id};
            filters = JSON.stringify(filter);
            comboStr.load({params:{filters:filters}});

            },
          

func_Search:function(me) {
     var grid=me.up('grid'),
         store=grid.getStore();
      store.reload();
   },
 loadProductClassificationCombo:function(combo,newValue,old,eopt) {
     
     var form=combo.up('form'),
         classCombo=form.down('combo[name=product_class_category]');

      if(newValue!=0){
       var filter = {'section_id':newValue};
          var filters = JSON.stringify(filter);
         var store=classCombo.getStore();
         store.removeAll();
         store.load({params:{filters:filters}});
      }else{
         var store=classCombo.getStore();
         store.removeAll();
         store.load();
      }
    
   },
   loadClassAndCategoryCombo: function(combo,newValue,old,eopt) {
     var form = combo.up('form'),
       classCombo = form.down('combo[name=product_class_category]'),
       catCombo = form.down('combo[name=classification_category]'),
       devCombo = form.down('combo[name=device_type_id]');
         
         

      if(newValue!=0){
       var filter = {'section_id':newValue};
          var filters = JSON.stringify(filter);
          var store = classCombo.getStore();
          var store2 = catCombo.getStore();
         store.removeAll();
         store2.removeAll();
         store.load({params:{filters:filters}});
         store2.load({params:{filters:filters}});
      }else{
         var store=classCombo.getStore();
         var store2=classCombo.getStore();
         store2.removeAll();
         store.removeAll();
         store2.load();
         store.load();
      }
      if(newValue == 4){
         devCombo.setVisible(true);
         devCombo.getStore().load();
      }else{
      devCombo.setVisible(false);
      }     
   },
   func_LoadClassificationCombo: function(combo,newValue,old,eopt) {
      var form=combo.up('form'),
         catCombo=form.down('combo[name=classification_category]'),
         section_id= form.down('combo[name=section_id]').getValue();
      if(newValue!=0){
       var filter = {'prodclass_category_id':newValue};
       
          var filters = JSON.stringify(filter);
         var store=catCombo.getStore();
         store.removeAll();
         store.load({params:{filters:filters}});
      console.log(filters);
      }else{
        if(section_id !=0){
          var filter = {'section_id':section_id};
          var filters = JSON.stringify(filter);
          var filters = JSON.stringify(filter);
          var store=catCombo.getStore();
          store.removeAll();
         store.load({params:{filters:filters}});
         }
         else{
          var store=catCombo.getStore();
          store.removeAll();
          store.load();
         }
        
      }
     
   },

   loadProductClassificationComboFromGrid: function(combo,newValue,old,eOpts) {
     var grid=combo.up('grid'),
          ClassStr=grid.down('combo[name=classification]').getStore();
          ClassStr.removeAll();
          if(newValue!=0){
          var filter = {'section_id':newValue};
          var filters = JSON.stringify(filter);
          ClassStr.load({params:{filters:filters}})
        }else{
          ClassStr.load();
        }
    },
    loadProductClassificationComboFromForm: function(combo,newValue,old,eOpts) {
     var form=combo.up('form'),
          ClassStr=form.down('combo[name=classification_id]').getStore();
          ClassStr.removeAll();
          if(newValue!=0){
          var filter = {'section_id':newValue};
          var filters = JSON.stringify(filter);
          ClassStr.load({params:{filters:filters}})
        }else{
          ClassStr.load();
        }
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

   add_exporter:function(me) {
           var pnl=me.up('form'),
                grid=pnl.down('gridpanel'),
                toolbar=grid.down('toolbar'),
                exportBtn=toolbar.down('exportbtn');
                
                var clone = exportBtn.clone();
                
              
                me.insert(0, clone)
             
          },
  func_setDynamicStore: function(me) {
   var caller=me.up('form').xtype,
       gridStr=caller+'RevenueReportgridstr',
       chartStr=caller+'RevenueReportchartstr';
   var chartconfig = {storeId: chartStr,
                 proxy: {
                    url: 'summaryreport/getChatRevenueReport',
                   }
              };
   Ext.create('Admin.store.summaryreport.ReportsGlobalAbstractStr', chartconfig);
   var gridconfig = {storeId: gridStr,
                 proxy: {
                    url: 'summaryreport/getGridRevenueReport',
                   }
              };
   Ext.create('Admin.store.summaryreport.ReportsGlobalAbstractStr', gridconfig);

   //setting the names 
   me.down('hiddenfield[name=cartesianStr]').setValue(chartStr);
   me.down('hiddenfield[name=gridStr]').setValue(gridStr);
  },

func_RefreshGridReportFilters: function(btn) {
    var  form = btn.up('form'),
         pnl = form.up('panel'),
         grid = pnl.down('grid'),
         store = grid.getStore();
    store.removeAll();
    store.reload();
 },
 func_grouper: function(box, newValue, oldValue) {
   var grid = box.up('grid'),
        store = grid.getStore(),
        classification = grid.down('gridcolumn[name=classification_name]'),
        assesment = grid.down('gridcolumn[name=assessment_procedure]');

        if(newValue == 1){
          assesment.setVisible(true);
          classification.setVisible(false);
            store.getProxy().url = 'summaryreport/getProductClassificationGridReports';
            store.removeAll();
            store.load();
            store.group('classification_name');
         }
         else{
          classification.setVisible(true);
          assesment.setVisible(false);
            store.getProxy().url = 'summaryreport/getProductAssessmentGridReports';
            store.removeAll();
            store.load();
            store.group('assessment_procedure');
         }
 },
  //support function 
  loadadditionalinfo: function() {
    console.log('all is well');
  },
  func_setModuleDocReports: function(me){
      var form=me.up('panel'),
          panel = form.up('panel'),
           module_id=panel.down('hiddenfield[name=module_id]').getValue();
           me.down('hiddenfield[name=module_id]').setValue(module_id);
    },
 func_loadSystemGeneratedDocs: function(btn){
      var form=btn.up('form'),
          grid = Ext.widget(btn.gridXtype),
          ref = form.down('textfield[name=Reference]').getValue(),
          module_id = form.down('hiddenfield[name=module_id]').getValue(),
          doc_type = form.down('combo[name=applicable_documents]').getValue();

      grid.down('textfield[name=reference_no]').setValue(ref);
      grid.down('hiddenfield[name=module_id]').setValue(module_id);
      grid.down('combo[name=doc_type]').setValue(doc_type);
      
      funcShowCustomizableWindow('Applications Receipts', '60%', grid, 'customizablewindow');


    },
 previewGeneratedReceipts: function(btn) {
   var item = btn.up('button'),
       record = item.getWidgetRecord();
   var action_url = 'reports/generateApplicationReceipt?application_id=' + record.get('application_id')+'&payment_id=' + record.get('id')+'&module_id=' + record.get('module_id')+'&table_name=' + record.get('table_name')+'&application_code=' + record.get('application_code');
   print_report(action_url);
 },
 printSysGeneratedDocuments: function (btn) {
   var form = btn.up('form'),
       applicable_documents = form.down('combo[name=applicable_documents]').getValue(),
       module_id = form.down('hiddenfield[name=module_id]').getValue(),
       reference_no = form.down('textfield[name=Reference]').getValue(),
       action_url = 'summaryreport/generatedSystemReport?module_id=' + module_id +'&doc_type=' + applicable_documents+'&reference_no=' + reference_no;
     print_report(action_url);
 },
 func_LoadPremiseRegisterReportFilters: function (btn) {
   var form = btn.up('form'),
       panel = form.up('panel'),
       grid = panel.down('grid'),
       cartesian = panel.down('cartesian'),
       sub_module_id = form.down('combo[name=sub_module_id]').getValue(),
       zone_id = form.down('combo[name=zone_id]').getValue(),
       section_id = form.down('combo[name=section_id]').getValue(),
       to_date = form.down('datefield[name=to_date]').getValue(),
       from_date=form.down('datefield[name=from_date]').getValue(),
       grid_store = grid.getStore(),
       cartesian_store = cartesian.getStore();
       console.log(cartesian);
       console.log(cartesian_store);
   grid_store.removeAll();
   grid_store.load();
   cartesian_store.removeAll();
   cartesian_store.load({params:{
          'sub_module_id':sub_module_id,
          'zone_id':zone_id,
          'section_id':section_id,
          'to_date':to_date,
          'from_date':from_date
    }});

 },
 setPremiseRegisterCartesianStr: function(me) {
    var gridconfig = {
             storeId: 'premiseRegisterChartStr',
             proxy: {
                    url: 'summaryreport/getPremiseRegisterChart',
                   }
              };
   var store = Ext.create('Admin.store.summaryreport.ReportsGlobalAbstractStr', gridconfig);
   var cartesian = me.down('cartesian');
   cartesian.setStore(store);
   
 },
 printProductRegSummary: function (btn) {
                 var filter_array='';
                 var name=btn.name,
                     xPrintFunc=btn.xPrintFunc,
                     xFileName=btn.xFileName;

                 var elem = btn.up('form'),
                   sub_module_id = elem.down('combo[name=sub_module_id]').getValue(),
                   module_id = elem.down('hiddenfield[name=module_id]').getValue(),
                   section_id = elem.down('combo[name=section_id]').getValue(),
                   directorate_id = elem.down('combo[name=directorate_id]').getValue(),
                   received_opt = elem.down('combo[name=received_opt]').getValue(),
                   evaluation_opt = elem.down('combo[name=evaluation_opt]').getValue(),
                   to_date = elem.down('datefield[name=to_date]').getValue(),
                   product_class_category = elem.down('combo[name=product_class_category]').getValue(),
                   device_type_id = elem.down('combo[name=device_type_id]').getValue(),
                   
                   zone_id = elem.down('combo[name=zone_id]').getValue(),
                   from_date = elem.down('datefield[name=from_date]').getValue(),
                   process_class = elem.down('combo[name=classification_process]').getValue();
                  from_date = Ext.Date.format(from_date,'Y-m-d');   
                  to_date = Ext.Date.format(to_date,'Y-m-d');   
                   var product_type = elem.down('combo[name=product_type]').getValue(),
                       classification_category = elem.down('combo[name=classification_category]').getValue();

   print_report('summaryreport/printProductRegSummary?classification_category=' + classification_category + '&module_id=' + module_id + '&function=' + xPrintFunc + '&filename=' + xFileName + '&headingText=' + btn.xheading + '&sub_module_id=' + sub_module_id + '&section_id=' + section_id + '&directorate_id=' + directorate_id + '&received_opt=' + received_opt + '&evaluation_opt=' + evaluation_opt + '&to_date=' + to_date + '&from_date=' + from_date + '&product_type=' + product_type + '&product_class_category=' + product_class_category + '&zone_id=' + zone_id + '&device_type_id=' + device_type_id);

             },
  
    /**
     * func_LoadreportGazetteFilters function added for filtering the gazetted report
     * 
     * by: Eng. Sadam Omary
     * on: 29-03-2021
     * 
     */
     func_LoadreportGazetteFilters: function (btn) {
        
      var formPnl = btn.up('form'),
      panelCtn = formPnl.up('panel'),
      grid = panelCtn.down('grid'), 
      gridStore = grid.getStore(),
      section_id = formPnl.down('combo[name=section_id]').getValue(),
      device_type_id = formPnl.down('combo[name=device_type_id]').getValue(),
      product_class_category = formPnl.down('combo[name=product_class_category]').getValue(),
      classification_category = formPnl.down('combo[name=classification_category]').getValue(),
      product_type=formPnl.down('combo[name=product_type]').getValue(),

      search_string_select=formPnl.down('combo[name=search_string_select]').getValue(),
      search_string=formPnl.down('textfield[name=search_string]').getValue(),
      from_date=formPnl.down('datefield[name=from_date]').getValue(),
      to_date=formPnl.down('datefield[name=to_date]').getValue();

      Ext.getBody().mask('Filtering Please wait...');

      gridStore.removeAll();
      gridStore.load({
             params:{
              section_id: section_id,
              device_type_id: device_type_id,
              product_class_category: product_class_category,
              classification_category:classification_category,
              product_type:product_type,
              search_string_select:search_string_select,
              search_string:search_string,
              from_date:from_date,
              to_date:to_date,
            },
            callback: function(records, operation, success) {
              Ext.getBody().unmask();
            }
        });                 
},
  
 /**
  * 
  * @param {Print Gazette function} 
  * 
  * Create by Eng.Sadam omary
  * on 30/03/2021 
  */
 printProductRegGazzette: function (btn) {
  var filter_array='';
  var name = btn.name,
      xPrintFunc=btn.xPrintFunc,
      xFileName=btn.xFileName;

  var grid = btn.up('grid'),
  panelCtn = grid.up('panel'),
  formPnl = panelCtn.down('form'),
  section_id = formPnl.down('combo[name=section_id]').getValue();
  device_type_id = formPnl.down('combo[name=device_type_id]').getValue(),
  product_class_category = formPnl.down('combo[name=product_class_category]').getValue(),
  classification_category = formPnl.down('combo[name=classification_category]').getValue(),
  product_type=formPnl.down('combo[name=product_type]').getValue(),

  search_string_select=formPnl.down('combo[name=search_string_select]').getValue(),
  search_string=formPnl.down('textfield[name=search_string]').getValue(),

  from_date = Ext.Date.format(formPnl.down('datefield[name=from_date]').getValue(),'Y-m-d');   
  to_date = Ext.Date.format(formPnl.down('datefield[name=to_date]').getValue(),'Y-m-d');   
  

 print_report('summaryreport/printRegisteredProductGazette?classification_category=' + classification_category + 
                              '&function=' + xPrintFunc + '&filename=' + xFileName + 
                              '&headingText=' + btn.xheading + '&section_id=' + section_id + 
                              '&to_date=' + to_date + '&from_date=' + from_date + '&product_type=' + product_type + 
                              '&product_class_category=' + product_class_category + '&device_type_id=' + device_type_id +
                              '&search_string_select=' + search_string_select + '&search_string=' + search_string);

},


  printPremiseRegSummary: function (btn) {
                 var filter_array='';
                 var name=btn.name,
                     xPrintFunc=btn.xPrintFunc,
                     xFileName=btn.xFileName;

                 var con = btn.up('form'),
                       sub_module_id = con.down('combo[name=sub_module_id]').getValue(),
                       premise_type = con.down('combo[name=premise_type_id]').getValue(),
                       section_id = con.down('combo[name=section_id]').getValue(),
                       directorate_id = con.down('combo[name=directorate_id]').getValue(),
                       business_scale = con.down('combo[name=business_scale_id]').getValue(),
                       business_type = con.down('combo[name=business_type_id]').getValue(),
                       
                       zone_id = con.down('combo[name=zone_id]').getValue(),
                       received_opt = con.down('combo[name=received_opt]').getValue(),
                       evaluation_opt = con.down('combo[name=evaluation_opt]').getValue(),
                       from_date = con.down('datefield[name=from_date]').getValue(),
                       module_id = 2,
                       to_date = con.down('datefield[name=to_date]').getValue(); 
                  from_date = Ext.Date.format(from_date,'Y-m-d');   
                  to_date = Ext.Date.format(to_date,'Y-m-d');   
          print_report('summaryreport/printPremiseRegistrationReport?premise_type='+premise_type+'&module_id='+module_id+'&function='+xPrintFunc+'&filename='+xFileName+'&headingText='+btn.xheading+'&sub_module_id='+sub_module_id+'&section_id='+section_id+'&directorate_id='+directorate_id+'&received_opt='+received_opt+'&evaluation_opt='+evaluation_opt+'&to_date='+to_date+'&from_date='+from_date+'&business_scale='+business_scale+'&business_type='+business_type+'&zone_id='+zone_id);

             },
  printPremiseRegister: function (btn) {
           var grid=btn.up('grid'),
               panel = grid.up('panel'),
               sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
               zone_id = panel.down('combo[name=zone_id]').getValue(),
               section_id = panel.down('combo[name=section_id]').getValue(),
               to_date = panel.down('datefield[name=to_date]').getValue(),
               from_date=panel.down('datefield[name=from_date]').getValue();
                from_date = Ext.Date.format(from_date,'Y-m-d');   
                to_date = Ext.Date.format(to_date,'Y-m-d');   
          print_report('summaryreport/printPremiseRegister?sub_module_id='+sub_module_id+'&section_id='+section_id+'&to_date='+to_date+'&from_date='+from_date+'&zone_id='+zone_id);

             },
  printIERegSummaryReport: function(btn) {
           var con=btn.up('form'),
               sub_module_id = con.down('combo[name=sub_module_id]').getValue(),
               type_category = con.down('combo[name=type_category]').getValue(),
               section_id = con.down('combo[name=section_id]').getValue(),
               directorate_id = con.down('combo[name=directorate_id]').getValue(),
               received_opt = con.down('combo[name=received_opt]').getValue(),
               evaluation_opt = con.down('combo[name=evaluation_opt]').getValue(),
               
               zone_id = con.down('combo[name=zone_id]').getValue(),
               from_date = con.down('datefield[name=from_date]').getValue(),
               to_date = con.down('datefield[name=to_date]').getValue(),
               module_id = 4;
               from_date = Ext.Date.format(from_date,'Y-m-d');   
               to_date = Ext.Date.format(to_date,'Y-m-d'); 
          print_report('summaryreport/printIERegSummaryReport?sub_module_id='+sub_module_id+'&section_id='+section_id+'&to_date='+to_date+'&from_date='+from_date+'&type_category='+type_category+'&directorate_id='+directorate_id+'&received_opt='+received_opt+'&evaluation_opt='+evaluation_opt+'&module_id='+module_id+'&zone_id='+zone_id);

  },
  printGmpRegSummaryReport: function(btn) {
    var con=btn.up('form'),
        sub_module_id = con.down('combo[name=sub_module_id]').getValue(),
        facility_location = con.down('combo[name=facility_location]').getValue(),
        section_id = con.down('combo[name=section_id]').getValue(),
        directorate_id = con.down('combo[name=directorate_id]').getValue(),
        
        zone_id = con.down('combo[name=zone_id]').getValue(),
        received_opt = con.down('combo[name=received_opt]').getValue(),
        evaluation_opt = con.down('combo[name=evaluation_opt]').getValue(),
        from_date = con.down('datefield[name=from_date]').getValue(),
        to_date = con.down('datefield[name=to_date]').getValue(),
        module_id=3;
        from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
    print_report('summaryreport/printGMPRegSummaryReport?sub_module_id='+sub_module_id+'&section_id='+section_id+'&to_date='+to_date+'&from_date='+from_date+'&facility_location='+facility_location+'&directorate_id='+directorate_id+'&received_opt='+received_opt+'&evaluation_opt='+evaluation_opt+'&module_id='+module_id+'&zone_id='+zone_id);
  },
  printCTRegSummaryReport:function(btn) {
     var con=btn.up('form'),
         sub_module_id = con.down('combo[name=sub_module_id]').getValue(),
         clinical_category = con.down('combo[name=clinical_category]').getValue(),
         section_id = con.down('combo[name=section_id]').getValue(),
         directorate_id = con.down('combo[name=directorate_id]').getValue(),
         received_opt = con.down('combo[name=received_opt]').getValue(),
         evaluation_opt = con.down('combo[name=evaluation_opt]').getValue(),
         
         zone_id = con.down('combo[name=zone_id]').getValue(),
         from_date = con.down('datefield[name=from_date]').getValue(),
         to_date = con.down('datefield[name=to_date]').getValue(),
         module_id=7;
          from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
    print_report('summaryreport/printCTRegSummaryReport?sub_module_id='+sub_module_id+'&section_id='+section_id+'&to_date='+to_date+'&from_date='+from_date+'&clinical_category='+clinical_category+'&directorate_id='+directorate_id+'&received_opt='+received_opt+'&evaluation_opt='+evaluation_opt+'&module_id='+module_id+'&zone_id='+zone_id);

  },
  printPromAdvertRegSummaryReport: function(btn) {
     var con=btn.up('form'),
         sub_module_id = con.down('combo[name=sub_module_id]').getValue(),
         section_id = con.down('combo[name=section_id]').getValue(),
         directorate_id = con.down('combo[name=directorate_id]').getValue(),
         classification_id = con.down('combo[name=classification_id]').getValue(),
         received_opt = con.down('combo[name=received_opt]').getValue(),
         evaluation_opt = con.down('combo[name=evaluation_opt]').getValue(),
         zone_id = con.down('combo[name=zone_id]').getValue(),
         from_date = con.down('datefield[name=from_date]').getValue(),
         to_date = con.down('textfield[name=to_date]').getValue(),
        module_id=14;
        from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
    print_report('summaryreport/printPromAdvertRegSummaryReport?zone_id='+zone_id+'&sub_module_id='+sub_module_id+'&section_id='+section_id+'&to_date='+to_date+'&from_date='+from_date+'&classification_id='+classification_id+'&directorate_id='+directorate_id+'&received_opt='+received_opt+'&evaluation_opt='+evaluation_opt+'&module_id='+module_id);
  },
  printPremiseZonalSummaryReport: function(btn) {
    var grid=btn.up('grid'),
        pnl=grid.up('panel'),
        filter=pnl.down('form'),
         sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
         business_type_category_id = filter.down('combo[name=business_type_category_id]').getValue(),
         section_id = filter.down('combo[name=section_id]').getValue(),
         zone_id = filter.down('combo[name=zone_id]').getValue(),
         received_opt = filter.down('combo[name=received_opt]').getValue(),
         evaluation_opt = filter.down('combo[name=evaluation_opt]').getValue(),
         from_date = filter.down('datefield[name=from_date]').getValue(),
         to_date = filter.down('textfield[name=to_date]').getValue();
        module_id=2;
        from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
    print_report('summaryreport/printPremiseZonalSummaryReport?sub_module_id='+sub_module_id+'&section_id='+section_id+'&to_date='+to_date+'&from_date='+from_date+'&business_type_category_id='+business_type_category_id+'&zone_id='+zone_id+'&received_opt='+received_opt+'&evaluation_opt='+evaluation_opt);
  },
  exportPremiseZoneRegReport:function(btn) {
    var grid=btn.up('grid'),
        pnl=grid.up('panel'),
        filter=pnl.down('form'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
         business_type_category_id = filter.down('combo[name=business_type_category_id]').getValue(),
         section_id = filter.down('combo[name=section_id]').getValue(),
         zone_id = filter.down('combo[name=zone_id]').getValue(),
         received_opt = filter.down('combo[name=received_opt]').getValue(),
         evaluation_opt = filter.down('combo[name=evaluation_opt]').getValue(),
         from_date = filter.down('datefield[name=from_date]').getValue(),
         to_date = filter.down('textfield[name=to_date]').getValue();
         from_date = Ext.Date.format(from_date,'Y-m-d');   
         to_date = Ext.Date.format(to_date,'Y-m-d');
      print_report('summaryreport/exportPremiseZonalSummaryData?sub_module_id='+sub_module_id+'&business_type_category_id='+business_type_category_id+'&section_id='+section_id+'&zone_id='+zone_id+'&received_opt='+received_opt+'&evaluation_opt='+evaluation_opt+'&from_date='+from_date+'&to_date='+to_date);
  },
  printDispRegSummaryReport: function(btn) {
    var form=btn.up('form'),
        filter=form.down('form'),
         sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
         section_id = filter.down('combo[name=section_id]').getValue(),
         directorate_id = filter.down('combo[name=directorate_id]').getValue(),
         zone_id = filter.down('combo[name=zone_id]').getValue(),
         received_opt = filter.down('combo[name=received_opt]').getValue(),
         evaluation_opt = filter.down('combo[name=evaluation_opt]').getValue(),
         from_date = filter.down('datefield[name=from_date]').getValue(),
         to_date = filter.down('textfield[name=to_date]').getValue();
        module_id=15;
        from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
    print_report('summaryreport/printDisposalSummaryReport?sub_module_id='+sub_module_id+'&section_id='+section_id+'&to_date='+to_date+'&from_date='+from_date+'&directorate_id='+directorate_id+'&zone_id='+zone_id+'&received_opt='+received_opt+'&evaluation_opt='+evaluation_opt);
  },
  func_LoadModuleRegReportFilters: function(btn) {
    var form = btn.up('form'),
        panel = form.up('panel'),
        tabs = panel.down('moduleregistrationreporttabs'),
        modgridStr = tabs.down('moduleregreportgrid').getStore(),
        secStr = tabs.down('sectionregreportgrid').getStore();

        modgridStr.removeAll();
        modgridStr.load();

        secStr.removeAll();
        secStr.load();
    
  },
  func_exportModuleRegReport: function(btn) {
    var panel = btn.up('panel'),
        classification_process = panel.down('combo[name=classification_process]').getValue(),
        module_id = panel.down('combo[name=export_module_id]').getValue();
    if(!module_id){
        toastr.warning('Select export module!!', 'Warning Response');
        return false;
    }
    if(!classification_process){
        toastr.warning('Select export classification_process!!', 'Warning Response');
        return false;
    }
    var filter=panel.down('form'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
         section_id = filter.down('combo[name=section_id]').getValue(),
         zone_id = filter.down('combo[name=zone_id]').getValue(),
         from_date = filter.down('datefield[name=from_date]').getValue(),
         to_date = filter.down('textfield[name=to_date]').getValue();
         from_date = Ext.Date.format(from_date,'Y-m-d');   
         to_date = Ext.Date.format(to_date,'Y-m-d');
      print_report('summaryreport/exportModuleRegReportData?sub_module_id='+sub_module_id+'&module_id='+module_id+'&section_id='+section_id+'&zone_id='+zone_id+'&from_date='+from_date+'&to_date='+to_date+'&process_class='+classification_process);
  },
  printModuleRegSummary: function(btn) {
    var panel=btn.up('panel'),
        filter=panel.down('form'),
         sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
         section_id = filter.down('combo[name=section_id]').getValue(),
         module_id = filter.down('combo[name=module_id]').getValue(),
         zone_id = filter.down('combo[name=zone_id]').getValue(),
         from_date = filter.down('datefield[name=from_date]').getValue(),
         to_date = filter.down('textfield[name=to_date]').getValue();
        from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
    var tab = panel.down('moduleregistrationreporttabs'),
        activeTab = tab.getActiveTab(),
        index = tab.items.indexOf(activeTab);
    if(index == 0){
      print_report('summaryreport/printModuleRegReport?sub_module_id='+sub_module_id+'&section_id='+section_id+'&to_date='+to_date+'&from_date='+from_date+'&module_id='+module_id+'&zone_id='+zone_id);
    }
    else{
      print_report('summaryreport/printSectionRegReport?sub_module_id='+sub_module_id+'&section_id='+section_id+'&to_date='+to_date+'&from_date='+from_date+'&module_id='+module_id+'&zone_id='+zone_id);
    }
  },
});