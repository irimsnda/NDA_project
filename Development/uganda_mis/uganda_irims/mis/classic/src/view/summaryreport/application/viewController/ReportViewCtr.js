Ext.define('Admin.view.summaryreport.application.viewControllers.ReportViewCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportviewctr',
   

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

   func_ExpWinShow: function(item) {

         var me = this,
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            child = Ext.widget(childXtype);
            
            //filters transfer to the new win
           var grid = item.up('form');
           child.down('textfield[name=sub_module_id]').setValue(grid.down('combo[name=sub_module_id]').getValue());
           child.down('textfield[name=zone_id]').setValue(grid.down('combo[name=zone_id]').getValue());
           child.down('textfield[name=from_date]').setValue(grid.down('datefield[name=from_date]').getValue());
           child.down('textfield[name=to_date]').setValue(grid.down('datefield[name=to_date]').getValue());
           child.down('textfield[name=receivedOpt]').setValue(grid.down('combo[name=receivedOpt]').getValue());
           child.down('textfield[name=approvalOpt]').setValue(grid.down('combo[name=approvalOpt]').getValue());
           child.down('textfield[name=section_id]').setValue(grid.down('combo[name=section_id]').getValue());
           child.down('textfield[name=regDetails]').setValue(grid.down('combo[name=regDetails]').getValue());
           child.down('textfield[name=grid]').setValue(item.xspreadsheet);
            if(item.xFileName=='ProductSummaryReport'){
           child.down('textfield[name=Classification]').setValue(grid.down('combo[name=Classification]').getValue());
              }
          //setting the print options
          var dPrint=child.down('button[name=detailed]');
              dPrint.xFileName=item.xFileName;
              dPrint.xPrintFunc=item.xPrintFunc;
              dPrint.xspreadsheet=item.xspreadsheet;
              dPrint.xheading=item.xheading;

          var fPrint= child.down('button[name=filtered]');
              fPrint.xFileName=item.xFileName;
              fPrint.xPrintFunc=item.xPrintFunc;
              fPrint.xspreadsheet=item.xspreadsheet;
              fPrint.xheading=item.xheading;

        //adding components to the window
         var center = Ext.create({
                     xtype: item.xspreadsheet,
                     region: 'center',
                     bbar: [
                            {
                            xtype: 'pagingtoolbar',
                            store: item.xstore,
                            width: '100%',
                            displayInfo: true,
                            displayMsg: 'Showing {0} - {1} out of {2}',
                            emptyMsg: 'No Records',
                             beforeLoad: function () {
                             this.up('form').fireEvent('refresh', this);
                               
                            }
                          
                              
                      }]
                 });
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
          var store = btn.down('pagingtoolbar').store;
          store.load();
  },

  togleDocUploadGridSearch: function(item,value,oldvalue,eOpts) {
    var button=item.down('button[name=search]').enable();
  
    
  },

  func_showhideSpreasheetColumn: function (chk, value) {
          var  chk_name = chk.name;
          var name=chk.up('form'),
              con=name.up('form'),
              grid=con.down('textfield[name=grid]').getValue();
              var grid=Ext.ComponentQuery.query(grid);

          grid[0].columns[chk_name].setVisible(value);
            },    
  func_InitloadStore:function(btn) {
    var  cont=btn.up('form'),
         module_id = cont.down('textfield[name=module_id]').getValue(),
         sub_module_id = btn.down('combo[name=sub_module_id]');
     var sub_module_str= sub_module_id.getStore();
     sub_module_str.removeAll();
     sub_module_str.load({params:{module_id:module_id}});

    //set stores for the data representation views
          var cartesianStr=btn.down('hiddenfield[name=cartesianStr]').getValue(),
              gridStr=btn.down('hiddenfield[name=gridStr]').getValue(),
              cartesian=btn.down('cartesian'),
              grid=btn.down('gridpanel'); 
           cartesian.setStore(Ext.getStore(cartesianStr));   
           grid.reconfigure(Ext.getStore(gridStr));
     
    //load the stores
    var zone_id = btn.down('combo[name=zone_id]').getValue(),
           section_id = btn.down('textfield[name=section_id]').getValue(),
           from_date = btn.down('textfield[name=from_date]').getValue(),
           to_date = btn.down('textfield[name=to_date]').getValue(),
           sub_module_id=sub_module_id.getValue();

           if(btn.xtype=='productRevenueReportPnl'){
                var receivedOpt='trans_date',
                     approvalOpt;
           }else{
              var receivedOpt = cont.down('textfield[name=receivedOpt]').getValue(),
               approvalOpt = cont.down('textfield[name=approvalOpt]').getValue();
              }

          var store1 =  Ext.data.StoreManager.lookup(gridStr);
          var store2 =  Ext.data.StoreManager.lookup(cartesianStr);

         
          var Originalfilter = {
                      'from_date':from_date,
                      'to_date':to_date,
                      'receivedOpt':receivedOpt,
                      'approvalOpt':approvalOpt,
                      't1.zone_id':zone_id
                    };
          var filters = JSON.stringify(Originalfilter);
          store2.load({params:{ 
                                sub_module_id:sub_module_id,
                                module_id: module_id,
                                section_id: section_id,
                                filters: filters
                              }});
          store1.load({params:{ 
                                sub_module_id:sub_module_id,
                                module_id: module_id,
                                section_id: section_id,
                                filters: filters
                              }});
      },
    func_onTabActive:function(btn) {

        var   this_cont=btn.up('form'),
                panel=this_cont.up('form');
         this.func_InitloadStore(panel);

    
         },

    func_LoadreportFilters: function (btn) {
        
          // console.log(btn.up('form'));
           var grid = btn.up('form'),
           sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
           zone_id = grid.down('combo[name=zone_id]').getValue(),
           section_id = grid.down('textfield[name=section_id]').getValue(),
           from_date = grid.down('textfield[name=from_date]').getValue(),
           to_date = grid.down('textfield[name=to_date]').getValue();

           var panel=grid.up('form'),
           gridStr= panel.down('hiddenfield[name=gridStr]').getValue(),
           cartesianStr=panel.down('hiddenfield[name=cartesianStr]').getValue();

           var con=panel.up('form'),
           module_id=con.down('textfield[name=module_id]').getValue();


           if(btn.name=='filter_SummaryReport'){
           var  receivedOpt = grid.down('textfield[name=receivedOpt]').getValue(),
                approvalOpt = grid.down('textfield[name=approvalOpt]').getValue();
                
              }else{
              var  receivedOpt = 'trans_date',
                approvalOpt = 'trans_date';
            
              }

        
          
          //get filters
           var filter = { 
                          't1.zone_id':zone_id,
                          'approvalOpt':approvalOpt,
                          'receivedOpt':receivedOpt,
                          'from_date':from_date,
                          'to_date':to_date, 
                        };
           filters = JSON.stringify(filter);

          //reload all stores
         var panelStores = [gridStr, cartesianStr];
         Ext.each(panelStores, function(eachStore) {
         var store = Ext.getStore(eachStore);
            if(store){
                store.reload({params:{
                                sub_module_id:sub_module_id,
                                module_id: module_id,
                                section_id: section_id,
                                filters: filters

                        }});
            }
       })
                       
    },
    func_setModuleDocReports: function(me){
      var form=me.up('form'),
           module_id=form.down('textfield[name=module_id]').getValue();
           me.down('hiddenfield[name=module_id]').setValue(module_id);
    },
    func_loadUploadedDocsSearch: function(me) {
     
            var str=Ext.getStore('uploadedDocStr');
            str.reload();
    },

    func_exportSummaryReport: function (btn) {
                 var filter_array='';

                 var name=btn.name,
                     xPrintFunc=btn.xPrintFunc,
                     xFileName=btn.xFileName;

                 var elem = btn.up('form'),
                   
                   sub_module_id = elem.down('textfield[name=sub_module_id]').getValue(),
                   zone_id = elem.down('textfield[name=zone_id]').getValue(),
                   section_id = elem.down('textfield[name=section_id]').getValue(),
                   from_date = elem.down('datefield[name=from_date]').getValue(),
                   receivedOpt = elem.down('textfield[name=receivedOpt]').getValue(),
                   approvalOpt = elem.down('textfield[name=approvalOpt]').getValue(),
                   Classification = elem.down('textfield[name=Classification]').getValue(),
                   decision = elem.down('textfield[name=regDetails]').getValue(),
                   to_date = elem.down('datefield[name=to_date]').getValue();
                  
                   var header2=[];
                   var check = btn.xspreadsheet;
                   if(check){
                   var grid=elem.down(btn.xspreadsheet),
                       filterfield = grid.getPlugin('filterfield');
                   if(name=='filtered'){
                  //filters
                     var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
                    }

                      //existing filters
                      var Originalfilter = {'t1.section_id':section_id,'t1.sub_module_id':sub_module_id,'from_date':from_date,'to_date':to_date,'receivedOpt':receivedOpt,'approvalOpt':approvalOpt};
                      var filters = JSON.stringify(Originalfilter);

                   //headers
                   var header=Ext.pluck(grid.query('gridcolumn:not([hidden])'), 'name');
                   var x=0;
                   for (var i = 0; i <= header.length; i++) {
                    header2[x]= header[i];
                     x++;
                   }
                 }
                   
                   var header= Ext.encode(header2);
                   filter_array = Ext.JSON.encode(filter_array);
                    Ext.Ajax.request({
                      url: 'openoffice/exportall',
                      method: 'POST',
                      params : {
                                  'header':header,
                                  'filters':filters,
                                  'filter':filter_array,
                                  'issueplace':zone_id,
                                  'function':xPrintFunc,
                                  'filename':xFileName,
                                  'Classification':Classification,
                                  'decision':decision,
                                  'headingText': btn.xheading


                    },
                      
                       success: function (response, textStatus, request) {
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
                      }});
        

             },


  func_exportRevenueReport: function(btn) {
    var me=btn.up('form'),
        filters=me.down('reportRevenueFilters'),
        section_id=filters.down('combo[name=section_id]').getValue(),
        sub_module_id=filters.down('combo[name=sub_module_id]').getValue(),
        zone_id=filters.down('combo[name=zone_id]').getValue(),
        to_date=filters.down('datefield[name=to_date]').getValue(),
        Classification=me.down('combo[name=Classification]').getValue(),
        revenue_types=me.down('combo[name=revenue_types]').getValue(),
        from_date=filters.down('datefield[name=from_date]').getValue();

        var con=me.up('form'),
            module_id=con.down('textfield[name=module_id]').getValue();

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
                                  'Classification':Classification,
                                  'revenue_types':revenue_types,

                    },
                      
                       success: function (response, textStatus, request) {
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
                      }});
        
  
    
  },
  func_ageAnalysisAfterRender:function(me){
                //add columns to grid dynamically
                var grid = me,
                    panel=grid.up('form'),
                    module_id=panel.down('textfield[name=module_id]').getValue();
                    store=Ext.getStore('ageAnalysisDateSpanStr');
                    
                    //hide classification for othe modules
                    // if(module_id!=1){
                    //   grid.down('combo[name=classification]').setVisible(false);
                    // }

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
                                          flex: 1
                                      });
                            }else{
                                 var column = Ext.create('Ext.grid.column.Column', {
                                        text: record.data['min_days']+'>',
                                        dataIndex: record.data['order_no']+' ',
                                        flex: 1
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
     var temp=0;
     var form=combo.up('form'),
         panel=form.up('form');
       if(panel.xtype=='revenueReportPnl'){
        temp=1;
       }
      if(panel.xtype=='product_reportPnl' || temp==1){
       var  Classification=panel.down('combo[name=Classification]');
      if(newValue!=0){
       var filter = {'section_id':newValue};
          var filters = JSON.stringify(filter);
         var store=Classification.getStore();
         store.removeAll();
         store.load({params:{filters:filters}});
      }else{
         var store=Classification.getStore();
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

    ExportSummaryAgeAnalysis: function(btn) {
       var grid=btn.up('grid'),
                zone_id=grid.down('combo[name=zone_id]').getValue(),
                section_id=grid.down('combo[name=section_id]').getValue(),
                to_date=grid.down('datefield[name=to_date]').getValue(),
                from_date=grid.down('datefield[name=from_date]').getValue(),
                sub_module_id=grid.down('combo[name=sub_module_id]').getValue(),
                from_opt=grid.down('combo[name=from_opt]').getValue(),
                to_opt=grid.down('combo[name=to_opt]').getValue(),
                opt=grid.down('combo[name=opt]').getValue(),
                exclude_queried=grid.down('combo[name=queried_type]').getValue(),
                classification=grid.down('combo[name=classification]').getValue(),
                product_type=grid.down('combo[name=product_type]').getValue(),
                panel=grid.up('form'),
                module_id=panel.down('textfield[name=module_id]').getValue(),
                form=Ext.create('Ext.form.Panel', {}),
                frm=form.getForm();
              
              
        Ext.getBody().mask('Exporting...Please wait...');

        var con=grid.up('form'),
            module_id=con.down('textfield[name=module_id]').getValue();

        Ext.Ajax.request({
                      url: 'summaryreport/exportSummaryAgeAnalysis',
                      method: 'GET',
                      headers: {
                                'Authorization':'Bearer '+access_token
                            },
                      params : {
                              'module_id':module_id,
                              'zone_id':zone_id,
                              'to_date':to_date,
                              'from_date':from_date,
                              'section_id':section_id,
                              'sub_module_id':sub_module_id,
                              'from_opt':from_opt,
                              'to_opt':to_opt,
                              'opt':opt,
                              'classification':classification,
                              'product_type':product_type,
                              'exclude_queried':exclude_queried

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

  }

});