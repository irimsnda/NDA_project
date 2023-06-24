var PA_sectionid="";
var PA_sub_module="";
Ext.define('Admin.view.openOffice.promAdvert.controller.SpreadSheetPromAdvertCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spreadsheetpromadvertctr',
         

         reloadSheetStore: function(combo,newValue,old,eOpts) {
           var form=combo.up('form'),
                store=form.down('pagingtoolbar').getStore();
                PA_sub_module=newValue;
                if(newValue==0){
                  PA_sub_module=0;
                }
           store.load();
         },  

          loadApplicationColumns: function(sender,record) {
               PA_sectionid=record.data['id'];
               if(PA_sectionid==0){
                PA_sectionid='';
               }
              //load filters to other depedent stores
              var filter = {'t1.section_id':PA_sectionid};
              var   filters = JSON.stringify(filter);
              var form =this.lookupReference('pagridpanel'),
               Classificationstore=form.down('combo[name=classification_id]').getStore();

               Classificationstore.removeAll();
              

               Classificationstore.load({params:{filters:filters,table_name: 'par_classifications'}});
               

               //loading grid
               PA_sub_module=this.getView().down('combo[name=sub_module]').getValue();
              //add filters
              var filter = {'t1.section_id':PA_sectionid,'t1.sub_module_id':PA_sub_module};
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetpromadvertcolumnsstr').load({params:{filters:filters}});

            },
          loadadditionalinfo:  function(sender,record) {
              var productid=record.data['id'];
              var filter = { 't1.application_id':productid };
              var   filters = JSON.stringify(filter);
             Ext.data.StoreManager.lookup('spreadsheetpromotionmaterialproductsstr').reload({params:{filters:filters}});
             Ext.data.StoreManager.lookup('spreadsheetpromotionmaterialdetailsstr').reload({params:{filters:filters}});
             
            },
          funcReloadspreadSheetStrs: function() {
                   Ext.data.StoreManager.lookup('spreadsheetpromadvertcolumnsstr').reload();
                 }, 
          func_showhideSpreasheetColumn: function (chk, value) {
                  var  chk_name = chk.name;
                  var grid =this.lookupReference('pagridpanel');
                  grid.columns[chk_name].setVisible(value);
            },
        
             func_exportproductspreadsheet: function (btn) {

                 var name=btn.name;
                  var grid = this.lookupReference('pagridpanel'),
                  filterfield = grid.getPlugin('filterfield');
                  //filters
                     var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
                     var  Classification_id=grid.down('combo[name=classification_id]').getValue(),
                      type_id=grid.down('combo[name=type_id]').getValue(),
                      registration_status=grid.down('combo[name=registration_status]').getValue(),
                      validity_status=grid.down('combo[name=validity_status]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue();
                      

                      //existing filters
                      var Originalfilter = {'t1.section_id':PA_sectionid,'t1.sub_module_id':PA_sub_module};
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
                                  'classification': Classification_id,
                                  'type_id': type_id,
                                  'registration_status':registration_status,
                                  'validity_status':validity_status,
                                  'issueplace':zone_id,
                                  'headingText': 'PROMOTION AND ADVERTISEMENT APPLICATIONS SPREADSHEET',
                                  'function':'getPromAdvertSpreadsheet',
                                  'filename':'PromotionAdvertisementSpreadsheet'

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
                           Ext.getBody().unmask();
                           Ext.Msg.alert('Error', 'please try again');
                      }});
        

             },

                 
             func_clearfilters: function(btn) {
               grid = this.lookupReference('pagridpanel');
                
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
               Ext.apply(Ext.getStore('spreadsheetpromadvertcolumnsstr'), {pageSize: pagesize});
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