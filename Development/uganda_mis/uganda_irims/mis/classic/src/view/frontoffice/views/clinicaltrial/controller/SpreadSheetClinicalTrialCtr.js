var CT_sub_module="";
Ext.define('Admin.view.openOffice.clinicaltrial.controller.SpreadSheetClinicalTrialCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spreadsheetclinicaltrialctr',


           loadApplicationColumns: function(combo, record, eOpts) {
        
               //loading grid
               CT_sub_module=combo.getValue();
              //add filters
              var filter = {'t1.sub_module_id':CT_sub_module};
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetclinicaltrialtapplicationcolumnsstr').load({params:{filters:filters}});

            },
          loadadditionalinfo:  function(sender,record) {
              var clinicaltrial_id=record.data['id'];
              
              var filter = { 't1.application_id':clinicaltrial_id };
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('clinicaltrialstudysitestr').reload({params:{filters:filters}});
              Ext.data.StoreManager.lookup('clinicaltrialinvestigatorsstr').reload({params:{filters:filters}});
              Ext.data.StoreManager.lookup('clinicaltrialimpproductsstr').reload({params:{filters:filters}});
            },
          funcReloadspreadSheetStrs: function() {
                   Ext.data.StoreManager.lookup('spreadsheetclinicaltrialtapplicationcolumnsstr').reload();
                 }, 
          func_showhideSpreasheetColumn: function (chk, value) {
                  var  chk_name = chk.name;
                  var grid =this.lookupReference('ctgridpanel');
                  grid.columns[chk_name].setVisible(value);
            },
            func_exportCTspreadsheet: function (btn) {

                 var name=btn.name;
                  var grid = this.lookupReference('ctgridpanel'),
                  filterfield = grid.getPlugin('filterfield');
                  console.log(grid);
                  //filters
                      var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
                      var  duration_desc=grid.down('combo[name=duration_desc]').getValue(),
                      currency_id=  grid.down('combo[name=currency_id]').getValue(),
                      registration_status=  grid.down('combo[name=registration_status]').getValue(),
                      validity_status=  grid.down('combo[name=validity_status]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue();
                      

                      var Originalfilter = {'t1.sub_module_id':CT_sub_module};
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

                   //mask
                   Ext.getBody().mask('Exporting Records Please wait...');

                    Ext.Ajax.request({
                      url: 'openoffice/exportall',
                      method: 'POST',
                      params : {
                                  'header':header,
                                  'filters':filters,
                                  'filter':filter_array,
                                  'duration_desc': duration_desc,
                                  'currency_id':currency_id,
                                  'registration_status':registration_status,
                                  'validity_status':validity_status,
                                  'issueplace':zone_id,
                                  'headingText': 'CLINICAL TRIALS APPLICATIONS SPREADSHEET',
                                  'function':'getClinicalTrialsSpreadsheet',
                                  'filename':'ClinicalTrialSpreadsheet'
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
                 grid = this.lookupReference('ctgridpanel');
                
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
               Ext.apply(Ext.getStore('spreadsheetclinicaltrialtapplicationcolumnsstr'), {pageSize: pagesize});
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