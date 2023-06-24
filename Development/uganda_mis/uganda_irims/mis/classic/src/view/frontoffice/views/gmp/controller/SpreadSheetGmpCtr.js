var gmp_sectionid="";
var gmp_sub_module="";
Ext.define('Admin.view.openOffice.gmp.controller.SpreadSheetGmpCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spreadsheetgmpctr',

        reloadSheetStore: function(combo,newValue,old,eOpts) {
           var form=combo.up('form'),
                store=form.down('pagingtoolbar').getStore();
                gmp_sub_module=newValue;
                if(newValue==0){
                  gmp_sub_module='';
                }
           store.load();
         },  
          loadApplicationColumns: function(sender,record) {
               gmp_sectionid=record.data['id'];
               if(gmp_sectionid==0){
                gmp_sectionid='';
               }
              //load filters to other depedent stores
              var filter = {'t1.section_id':gmp_sectionid};
              var   filters = JSON.stringify(filter);
               
               var form = this.lookupReference('gmpgridpanel'),
               BsnTypestore=form.down('combo[name=business_type_id]').getStore();
             
             
               BsnTypestore.removeAll();
              
              
               BsnTypestore.load({params:{filters:filters,table_name: 'par_business_types'}});
              

               //loading grid
               gmp_sub_module=this.getView().down('combo[name=sub_module]').getValue();
              //add filters
              var filter = {'t1.section_id':gmp_sectionid,'t1.sub_module_id':gmp_sub_module};
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetgmpapplicationcolumnsstr').load({params:{filters:filters}});

            },
          loadadditionalinfo:  function(sender,record) {
              var manufacturing_site_id=record.data['manufacturing_site_id'];
              var filter = { 't1.manufacturing_site_id':manufacturing_site_id };
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetgmpmanblockstr').reload({params:{filters:filters}});
             Ext.data.StoreManager.lookup('spreadsheetgmpmanlinestr').reload({params:{filters:filters}});
             Ext.data.StoreManager.lookup('spreadsheetgmpmansitestr').reload({params:{filters:filters}});
             //switch filters for bsn type details
             var filter = { 't1.id':manufacturing_site_id };
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetgmpbsntypedetailsstr').reload({params:{filters:filters}});
              //for inspection team
              var application_code = record.get('application_code');
              Ext.data.StoreManager.lookup('gmpInspectionTeamgridStr').reload({params:{application_code:application_code}});

            },
            
          funcReloadspreadSheetStrs: function() {
                   Ext.data.StoreManager.lookup('spreadsheetapplicationcolumnsstr').reload();
                 }, 
          func_showhideSpreasheetColumn: function (chk, value) {
                  var  chk_name = chk.name;
                  var grid =this.lookupReference('gmpgridpanel');
                  grid.columns[chk_name].setVisible(value);
            },
        func_exportgmpspreadsheet: function (btn) {

                 var name=btn.name;
                  var grid = this.lookupReference('gmpgridpanel'),
                  filterfield = grid.getPlugin('filterfield');
                  console.log(grid);
                  //filters
                      var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
                      var  assessment_type_id=grid.down('combo[name=assessment_type_id]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue(),
                      business_type_id=grid.down('combo[name=business_type_id]').getValue(),
                      gmp_type_id=grid.down('combo[name=gmp_type_id]').getValue(),
                      registration_status=grid.down('combo[name=registration_status]').getValue(),
                      validity_status=grid.down('combo[name=validity_status]').getValue(),
                      application_status=grid.down('combo[name=application_status]').getValue(),
                      approval_recommendation=grid.down('combo[name=approval_recommendation]').getValue();

                      var Originalfilter = {'t1.section_id':gmp_sectionid,'t1.sub_module_id':gmp_sub_module};
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
                                  'business_type_id': business_type_id,
                                  'assessment_type':assessment_type_id,
                                  'gmp_type':gmp_type_id,
                                  'registration_status':registration_status,
                                  'validity_status':validity_status,
                                  'application_status':application_status,
                                  'approval_recommendation':approval_recommendation,
                                  'headingText': 'GMP APPLICATIONS SPREADSHEET',
                                  'issueplace':zone_id,
                                  'function':'getGmpSpreadSheet',
                                  'filename':'GMPProdductsSpreadsheet'
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
                 grid = this.lookupReference('gmpgridpanel');
                
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
              form.down('hiddenfield[name=appType]').setValue('gmp');

              funcShowCustomizableWindow('Application Documents', '60%', form, 'customizablewindow');
      
    },
});

