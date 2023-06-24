var disposal_sub_module="";
Ext.define('Admin.view.openOffice.disposal.controller.SpreadSheetDisposalCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spreadsheetdisposalctr',


           loadApplicationColumns: function(combo, record, eOpts) {
        
               //loading grid
               disposal_sub_module=combo.getValue();
              //add filters
              var filter = {'t1.sub_module_id':disposal_sub_module};
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetdisposaltapplicationcolumnsstr').load({params:{filters:filters}});

            },
          loadadditionalinfo:  function(sender,record) {
              var application_code=record.data['application_code'];
              
              var filter = { 't1.application_code':application_code };
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('disposalproductstr').reload({params:{filters:filters}});
            },
          funcReloadspreadSheetStrs: function() {
                   Ext.data.StoreManager.lookup('spreadsheetdisposaltapplicationcolumnsstr').reload();
                 }, 
          func_showhideSpreasheetColumn: function (chk, value) {
                  var  chk_name = chk.name;
                  var grid =this.lookupReference('disposalgridpanel');
                  grid.columns[chk_name].setVisible(value);
            },
          func_exportdisposalspreadsheet: function (btn) {

                 var name=btn.name;
                  var grid = this.lookupReference('disposalgridpanel'),
                  filterfield = grid.getPlugin('filterfield');
                  console.log(grid);
                  //filters
                      var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config'),
                      currency_id=  grid.down('combo[name=currency]').getValue(),
                      destruction_site=grid.down('combo[name=destruction_site]').getValue(),
                      destruction_method=grid.down('combo[name=destruction_method]').getValue(),
                      product_type=grid.down('combo[name=product_type]').getValue(),
                      packaging_unit=grid.down('combo[name=packaging_unit]').getValue(),
                      weight_unit=grid.down('combo[name=weight_unit]').getValue(),
                      inpsector_title=grid.down('combo[name=inpsector_title]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue();

                      var Originalfilter = {'t1.sub_module_id':disposal_sub_module};
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
                   //mask
                   Ext.getBody().mask('Exporting Records Please wait...');

                   var header= Ext.encode(header2);
                   filter_array = Ext.JSON.encode(filter_array);
                    Ext.Ajax.request({
                      url: 'openoffice/exportall',
                      method: 'POST',
                      params : {
                                  'header':header,
                                  'filters':filters,
                                  'filter':filter_array,
                                  'destruction_site':destruction_site,
                                  'destruction_method':destruction_method,
                                  'product_type':product_type,
                                  'packaging_unit':packaging_unit,
                                  'weight_unit':weight_unit,
                                  'inpsector_title':inpsector_title,
                                  'currency_id':currency_id,
                                  'issueplace':zone_id,
                                  'headingText': 'DISPOSAL APPLICATIONS SPREADSHEET',
                                  'function':'getDisposalSpreadsheetColumns',
                                  'filename':'disposalSpreadsheet'
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
                 grid = this.lookupReference('disposalgridpanel');
                
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
               Ext.apply(Ext.getStore('spreadsheetdisposaltapplicationcolumnsstr'), {pageSize: pagesize});
         },
    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
    setConfigGridsStore: function (obj, options) {
      console.log('called');
        this.fireEvent('setConfigGridsStore', obj, options);
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