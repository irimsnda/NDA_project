var IEP_sectionid="";
var IEP_sub_module="";
Ext.define('Admin.view.openOffice.importexportpermit.controller.SpreadSheetIEPermitCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spreadsheetiepermitctr',

          reloadSheetStore: function(combo,newValue,old,eOpts) {
           var form=combo.up('form'),
                store=form.down('pagingtoolbar').getStore();
                IEP_sub_module=newValue;
                if(newValue==0){
                  IEP_sub_module="";
                }
           store.load();
         },  
          loadApplicationColumns: function(sender,record) {
               IEP_sectionid=record.data['id'];
               if(IEP_sectionid==0){
                IEP_sectionid='';
               }
              //load filters to other depedent stores
              var filter = {'t1.section_id':IEP_sectionid};
              var   filters = JSON.stringify(filter);
               
               var form = this.lookupReference('iepermitgridpanel'),
               weightStr=form.down('combo[name=weight_unit]').getStore(),
               permit_categoryStr=form.down('combo[name=permit_category_id]').getStore(),
               import_typecategoryStr=form.down('combo[name=import_typecategory_id]').getStore();
             
               
               permit_categoryStr.removeAll();
               import_typecategoryStr.removeAll();
               
               weightStr.removeAll();

               
               permit_categoryStr.load({params:{filters:filters}});
               import_typecategoryStr.load({params:{filters:filters}});
               weightStr.load({params:{filters:filters}});

               //loading grid
               IEP_sub_module=this.getView().down('combo[name=sub_module]').getValue();
              //add filters
              var filter = {'t1.section_id':IEP_sectionid,'t1.sub_module_id':IEP_sub_module};
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetiepermitapplicationcolumnsstr').load({params:{filters:filters}});

            },
         
          funcReloadspreadSheetStrs: function() {
                   Ext.data.StoreManager.lookup('spreadsheetiepermitapplicationcolumnsstr').reload();
                 }, 
          func_showhideSpreasheetColumn: function (chk, value) {
                  var  chk_name = chk.name;
                  var grid =this.lookupReference('iepermitgridpanel');
                  grid.columns[chk_name].setVisible(value);
            },
         func_exportiepermitspreadsheet: function (btn) {

                 var name=btn.name;
                  var grid = this.lookupReference('iepermitgridpanel'),
                  filterfield = grid.getPlugin('filterfield');
                 // console.log(grid);
                  //filters
                      var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
                      var  application_type_id= zone_id=grid.down('combo[name=zone_id]').getValue(),
                      permit_category_id=grid.down('combo[name=permit_category_id]').getValue(),
                      permit_reason_id=grid.down('combo[name=permit_reason_id]').getValue(),
                      port_id=grid.down('combo[name=port_id]').getValue(),
                      weight_unit=grid.down('combo[name=weight_unit]').getValue(),
                      currency_id=grid.down('combo[name=currency_id]').getValue(),
                      consignee_options_id=grid.down('combo[name=consignee_options_id]').getValue(),
                      import_typecategory_id=grid.down('combo[name=import_typecategory_id]').getValue();

                      var Originalfilter = {'t1.section_id':IEP_sectionid,'t1.sub_module_id':IEP_sub_module};
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
                                  'filters':filters,
                                  'filter':filter_array,
                                  'application_type': application_type_id,
                                  'permit_category':permit_category_id,
                                  'import_typecategory':import_typecategory_id,
                                  'permit_reason':permit_reason_id,
                                  'port':port_id,
                                  'currency':currency_id,
                                  'issueplace':zone_id,
                                  'weight_unit':weight_unit,
                                  'headingText': 'IMPORT/EXPORT Permit SPREADSHEET',
                                  'consignee_options':consignee_options_id,
                                  'function':'getIEPermitSpreadSheet',
                                  'filename':'ImportEportPermitSpreadsheet'
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
               grid = this.lookupReference('iepermitgridpanel');
                
                 var t=grid.down('headercontainer').getGridColumns();

                 for (var i = t.length - 1; i >= 2; i--) {
                      column=t[i];
                      var textfield=column.down('textfield');

                      if(textfield!=null){
                         textfield.setValue('');
                      }

                      grid = column.up('grid');
                      grid.getStore().removeFilter(column.filter.property || column.dataIndex);
                     // column.setText(column.textEl.dom.firstElementChild.innerText);
                 
                   }
             },
             setPageSize: function(combo, newValue){
               var pagesize=combo.getValue();
               Ext.apply(Ext.getStore('spreadsheetiepermitapplicationcolumnsstr'), {pageSize: pagesize});
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

});