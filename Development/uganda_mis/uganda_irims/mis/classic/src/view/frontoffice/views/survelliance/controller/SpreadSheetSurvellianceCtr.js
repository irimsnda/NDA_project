var survelliance_sectionid="";
var survelliance_sub_module="";
var application_id = 0;
Ext.define('Admin.view.openOffice.survelliance.controller.SpreadSheetSurvellianceCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spreadsheetsurvelliancectr',

        reloadSheetStore: function(combo,newValue,old,eOpts) {
           var form=combo.up('form'),
                store=form.down('pagingtoolbar').getStore();
                survelliance_sub_module=newValue;
                if(newValue==0){
                  survelliance_sub_module='';
                }
               // console.log(store);
           store.load();
         },  
          loadApplicationColumns: function(sender,record, index, eOpts) {
           
               survelliance_sectionid=record.data['id'];
               if(survelliance_sectionid==0){
                survelliance_sectionid='';
               }
              //load filters to other depedent stores
              var filter = {'t1.section_id':survelliance_sectionid},
                  filters = JSON.stringify(filter),
                  gridview = this.lookupReference('survelliancesampleproductgridpanel');
               

               // var grid = this.lookupReference('survelliancegridpanel'),
               // BsnTypestore=form.down('combo[name=business_type_id]').getStore();
             
             
               // BsnTypestore.removeAll();
              
              
               // BsnTypestore.load({params:{filters:filters,table_name: 'par_business_types'}});
              

               //loading grid
               survelliance_sub_module=this.getView().down('combo[name=sub_module]').getValue();
              //add filters
              var filter = {'section_id':survelliance_sectionid,'sub_module_id':survelliance_sub_module};
              var   filters = JSON.stringify(filter);
              gridview.getStore().load({params:{filters:filters}});

            },
          
          loadadditionalinfo:  function(sender,record) {
              var program_implementation_id=record.data['program_implementation_id'];
              var application_code=record.data['application_code'];
             // var pms_plan_id=record.data['pms_plan_id'];
              application_id = record.data['application_id'];
     
              Ext.data.StoreManager.lookup('survelliancesampleandproductdetailsviewStr').reload({params:{application_id:application_id}});
             
             Ext.data.StoreManager.lookup('survellianceuploadeddocviewStr').reload({params:{application_code:application_code}});
             
            },
          loadadditionalSampleApplicationinfo:  function(sender,record) {
              var program_implementation_id=record.data['program_implementation_id'];
              var application_code=record.data['application_code'];
              var sample_id=record.data['sample_id'];
              application_id = record.data['application_id'];
     
              Ext.data.StoreManager.lookup('survelliancepmsingredientsStr').reload({params:{sample_id:sample_id}});
             
             Ext.data.StoreManager.lookup('survellianceuploadeddocviewStr').reload({params:{application_code:application_code}});
             
            },
            
          funcReloadspreadSheetStrs: function() {
                   Ext.data.StoreManager.lookup('spreadsheetapplicationcolumnsstr').reload();
                 }, 
          func_showhideSpreasheetColumn: function (chk, value) {
                  var  chk_name = chk.name;
                  var grid =this.lookupReference('survelliancegridpanel');
                  grid.columns[chk_name].setVisible(value);
            },
          func_showhideSampleProductSpreasheetColumn: function (chk, value) {
                  var  chk_name = chk.name;
                  var grid =this.lookupReference('survelliancesampleproductgridpanel');
                  grid.columns[chk_name].setVisible(value);
            },
         func_exportSurvelliancespreadsheet: function (btn) {

                 var name=btn.name;
                  var grid = this.lookupReference('survelliancegridpanel'),
                  filterfield = grid.getPlugin('filterfield');
                  console.log(grid);
                  //filters
                      var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
                      var  region_id=grid.down('combo[name=region_id]').getValue(),
                      district_id=grid.down('combo[name=district_id]').getValue(),
                      site_country_id=grid.down('combo[name=site_country_id]').getValue(),
                      site_region_id=grid.down('combo[name=site_region_id]').getValue(),
                      site_district_id=grid.down('combo[name=site_district_id]').getValue(),
                      registration_status=grid.down('combo[name=registration_status]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue();

                      var Originalfilter = {'section_id':survelliance_sectionid,'sub_module_id':survelliance_sub_module};
                      var filters = JSON.stringify(Originalfilter);

                   //headers
                   if(name=='summary'){
                   var header=Ext.pluck(grid.query('gridcolumn:not([hidden])'), 'name');
                   var header2=[];
                   var x=0;
                   for (var i = 1; i <= header.length; i++) {
                    header2[x]= header[i];
                     x++;
                   }
                 }else{
                  var header=Ext.pluck(grid.columns, 'name');
                  var header2=[];
                   var x=0;
                   for (var i = 2; i <= header.length; i++) {
                    header2[x]= header[i];
                     x++;
                   }
                 }
                   
                   var header= Ext.encode(header2);
                   filter_array = Ext.JSON.encode(filter_array);
                   Ext.getBody().mask('Exporting Records Please wait...');
                    Ext.Ajax.request({
                      url: 'openoffice/exportall',
                      method: 'POST',
                      params : {
                                  'header':header,
                                  'section_id':sectionid,
                                  'filters':filters,
                                  'filter':filter_array,
                                  'region_id': region_id,
                                  'district_id': district_id,
                                  'site_country_id': site_country_id,
                                  'site_region_id': site_region_id,
                                  'site_district_id':site_district_id,
                                  'registration_status': registration_status,
                                  'business_scale_id':business_scale_id,
                                  'headingText': 'SURVEILLANCE APPLICATIONS SPREADSHEET',
                                  'issueplace':zone_id,
                                  'function':'getSurvellianceSpreadsheetApplications',
                                  'filename':'SurvellianceProdductsSpreadsheet'
                    },
                      
                       success: function (response, textStatus, request) {
                        var t = JSON.parse(response.responseText);
                        var a = document.createElement("a");
                        a.href = t.file; 
                        a.download = t.name;
                        document.body.appendChild(a);

                        a.click();
                     
                        a.remove();
                         Ext.getBody().unmask();
                      },
                      failure: function(conn, response, options, eOpts) {
                           Ext.Msg.alert('Error', 'please try again');
                           Ext.getBody().unmask();
                      }});
        

             },
             func_exportProductSurvelliancespreadsheet: function (btn) {

                 var name=btn.name;
                  var grid = this.lookupReference('survelliancesampleproductgridpanel'),
                  filterfield = grid.getPlugin('filterfield');
                  console.log(grid);
                  //filters
                      var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
                      var  pms_region_name=grid.down('combo[name=pms_region_name]').getValue(),
                      district_id=grid.down('combo[name=district_id]').getValue(),
                      site_country_id=grid.down('combo[name=site_country_id]').getValue(),
                      site_region_id=grid.down('combo[name=site_region_id]').getValue(),
                      site_district_id=grid.down('combo[name=site_district_id]').getValue();

                      var Originalfilter = {'section_id':survelliance_sectionid,'sub_module_id':survelliance_sub_module};
                      var filters = JSON.stringify(Originalfilter);

                   //headers
                   if(name=='summary'){
                   var header=Ext.pluck(grid.query('gridcolumn:not([hidden])'), 'name');
                   var header2=[];
                   var x=0;
                   for (var i = 1; i <= header.length; i++) {
                    header2[x]= header[i];
                     x++;
                   }
                 }else{
                  var header=Ext.pluck(grid.columns, 'name');
                  var header2=[];
                   var x=0;
                   for (var i = 2; i <= header.length; i++) {
                    header2[x]= header[i];
                     x++;
                   }
                 }
                   
                   var header= Ext.encode(header2);
                   filter_array = Ext.JSON.encode(filter_array);
                   Ext.getBody().mask('Exporting Records Please wait...');
                    Ext.Ajax.request({
                      url: 'openoffice/exportall',
                      method: 'POST',
                      params : {
                                  'header':header,
                                  'section_id':sectionid,
                                  'filters':filters,
                                  'filter':filter_array,
                                  'pms_region_name': pms_region_name,
                                  'district_id': district_id,
                                  'site_country_id': site_country_id,
                                  'site_region_id': site_region_id,
                                  'site_district_id':site_district_id,
                                  'headingText': 'SURVEILLANCE APPLICATIONS SPREADSHEET',
                                  'function':'getSurvellianceSampleSpreadsheetApplications',
                                  'filename':'SurvellianceProdductsSpreadsheet'
                    },
                      
                       success: function (response, textStatus, request) {
                        var t = JSON.parse(response.responseText);
                        var a = document.createElement("a");
                        a.href = t.file; 
                        a.download = t.name;
                        document.body.appendChild(a);

                        a.click();
                     
                        a.remove();
                         Ext.getBody().unmask();
                      },
                      failure: function(conn, response, options, eOpts) {
                           Ext.Msg.alert('Error', 'please try again');
                           Ext.getBody().unmask();
                      }});
        

             },
             func_clearfilters: function(btn) {
                 grid = this.lookupReference('survelliancegridpanel');
                
                 var t=grid.down('headercontainer').getGridColumns();

                 for (var i = t.length - 1; i >= 3; i--) {
                      column=t[i];
                      var textfield=column.down('textfield');
                      var combo=column.down('combobox');

                      if(textfield!=null){
                         textfield.setValue('');
                      }else{
                          combo.setValue(0);
                      }

                      grid = column.up('grid');
                      grid.getStore().removeFilter(column.filter.property || column.dataIndex);
                     // column.setText(column.textEl.dom.firstElementChild.innerText);
                 
                   }

             },
             setPageSize: function(combo, newValue){
               var pagesize=combo.getValue();
               Ext.apply(Ext.getStore('spreadsheetgmpapplicationcolumnsstr'), {pageSize: pagesize});
               
             },
    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
         
    func_viewUploadedDocs: function(btn) {
         var me = btn.up('button'),
              record = me.getWidgetRecord(),
              form = Ext.widget('uploadeddocsperapplicationGrid'),
              application_code = record.get('application_code');
              form.down('hiddenfield[name=application_code]').setValue(application_code);

              funcShowCustomizableWindow('Application Documents', '60%', form, 'customizablewindow');
      
    },
    func_viewSampleDetails: function(btn) {
         // var config = {config: {
         //            pageSize: 1000,
         //            storeId: 'spreadsheetPMSsampleFormStr',
         //            proxy: {
         //                url: 'openoffice/getSampleDetails'
         //            }
         //        }};
         var me = btn.up('button'),
              record = me.getWidgetRecord(),
              panel = Ext.widget('spreadsheetpmssampledetails'),
              form = panel.down('form'),
              grid = panel.down('gridpanel'),
              toolbar = grid.down('pagingtoolbar'),
              sample_id = record.get('sample_id'),
              dynamicStore = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', 
                {
                  pageSize: 1000,
                  autoLoad: false,
                  storeId: 'spreadsheetPMSsampleFormStr',
                  proxy: {
                        url: 'openoffice/getSampleDetails'
                    }
                });
              gridStore = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', 
                {
                  pageSize: 1000,
                  autoLoad: true,
                  storeId: 'spreadsheetPMSsampleGridStr',
                  proxy: {
                        url: 'surveillance/getPmsSampleIngredients'
                    }
                });

              grid.setStore(gridStore);
              toolbar.setStore(gridStore);
              panel.down('hiddenfield[name=sample_id]').setValue(sample_id);
             //get data
             dynamicStore.load({
               params:{'sample_id':sample_id},
               callback : function(records, operation, success) {
                  console.log(records[0]);
                  form.loadRecord(records[0]);
                  //gridStore.load({params:{'sample_id':records[0].get('sample_id')}});
              }
             });
             
             // Ext.Ajax.request({
             //          url: 'openoffice/getSampleDetails',
             //          method: 'GET',
             //          params : {
             //                      'application_id':application_id,
             //          },
                      
             //           success: function (response, textStatus, request) {
             //             console.log(response.responseText);
             //            var t = JSON.parse(response.responseText);
             //            var record = Object.entries(t.data);
             //            console.log(record);

             //            form.loadRecord(record);
             //            Ext.getBody().unmask();
             //          },
             //          failure: function(conn, response, options, eOpts) {
             //               Ext.Msg.alert('Error Loading Data', 'please try again');
             //               Ext.getBody().unmask();
             //          }});


              funcShowCustomizableWindow('Sample Details', '80%', panel, 'customizablewindow');
      
    },
     setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
    
    initiateGridStores: function() {
     var config ={
                pageSize: 1000,
                remoteFilter: true,
                storeId: 'survelliancespreadsheetStr',
                proxy: {
                    url: 'openoffice/getSurvellianceSpreadsheetApplications',
                }
            }
      var store = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', config);
       
      var grid = this.lookupReference('survelliancegridpanel'),
          toolbar = grid.down('pagingtoolbar');
       grid.setStore(store);
       toolbar.setStore(store);
      
    },
    initiateSampleProductGridStores:function() {
    var config ={
                pageSize: 1000,
                storeId: 'survelliancesampleproductspreadsheetStr',
                remoteFilter: true,
                proxy: {
                    url: 'openoffice/getSurvellianceSampleSpreadsheetApplications',
                }
            }
      var store = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', config);
       
      var grid = this.lookupReference('survelliancesampleproductgridpanel'),
          toolbar = grid.down('pagingtoolbar');
       grid.setStore(store);
       toolbar.setStore(store);
      
    },
});

