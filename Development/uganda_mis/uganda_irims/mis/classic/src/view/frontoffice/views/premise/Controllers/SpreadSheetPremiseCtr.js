var sectionid="";
var sub_module="";
Ext.define('Admin.view.openOffice.premise.Controller.SpreadSheetPremiseCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spreadsheetpremisectr',

         reloadSheetStore: function(combo,newValue,old,eOpts) {
           var form=combo.up('form'),
                store=form.down('pagingtoolbar').getStore();
                sub_module=newValue;
                if(newValue==0){
                  sub_module="";
                }

           store.load();
         },  
          loadApplicationColumns: function(sender,record) {
               sectionid=record.data['id'];
               if(sectionid==0){
                sectionid='';
               }
              //load filters to other depedent stores
              var filter = {'t1.section_id':sectionid};
              var   filters = JSON.stringify(filter);
              var form =this.lookupReference('premisegridpanel'),
               BsnTypestore=form.down('combo[name=BsnType_id]').getStore();
             
               BsnTypestore.removeAll();
               BsnTypestore.load({params:{filters:filters,table_name: 'par_business_types'}});

               //loading grid
               sub_module=this.getView().down('combo[name=sub_module]').getValue();
              //add filters
              var filter = {'t1.section_id':sectionid,'t1.sub_module_id':sub_module};
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetpremiseapplicationcolumnsstr').load({params:{filters:filters}});

            },
          loadadditionalinfo:  function(sender,record) {
              var premiseid=record.data['premise_id'];
              var filter = { 't1.premise_id':premiseid };
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetpremisebsninfostr').reload({params:{filters:filters}});
              Ext.data.StoreManager.lookup('spreadsheetpremisepersonnelinfostr').reload({params:{filters:filters}});
    
            },
          funcReloadspreadSheetStrs: function() {
            console.log('dd00');
                   Ext.data.StoreManager.lookup('spreadsheetpremiseapplicationcolumnsstr').reload();
                 }, 
          func_showhideSpreasheetColumn: function (chk, value) {
                  var  chk_name = chk.name;
                  var grid =this.lookupReference('premisegridpanel');
                  grid.columns[chk_name].setVisible(value);
            },
            
             func_exportpremisespreadsheet: function (btn) {

                 var name=btn.name;
                  var grid = this.lookupReference('premisegridpanel'),
                  filterfield = grid.getPlugin('filterfield');
                  //filters
                     var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
                     var  Category_id=grid.down('combo[name=Category_id]').getValue(),
                      BsnType_id=grid.down('combo[name=BsnType_id]').getValue(),
                      BsnScale_id=grid.down('combo[name=BsnScale_id]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue(),
                      registration_status=grid.down('combo[name=registration_status]').getValue(),
                      validity_status=grid.down('combo[name=validity_status]').getValue(),
                      BsnCategory_id=grid.down('combo[name=BsnCategory_id]').getValue();


                      var Originalfilter = {'t1.section_id':sectionid,'t1.sub_module_id':sub_module};
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
                   xheading = 'PREMISE APPLICATIONS SPREADSHEET';
                   print_report('openoffice/exportall?header='+encodeURIComponent(JSON.stringify(header2))+'&filters='+encodeURIComponent(filters)+'&filter='+encodeURIComponent(JSON.stringify(filter_array))+'&function=getPremiseApplicationColumns&filename=PremiseProdductsSpreadsheet&headingText='+xheading+'&Category='+ Category_id+'&BsnType='+ BsnType_id+'&BsnCategory='+ BsnCategory_id+'&BsnScale_id='+ BsnScale_id+'&issueplace='+zone_id+'&registration_status='+registration_status+'&validity_status='+validity_status);
                   // var header= Ext.encode(header2);
                   // Ext.getBody().mask('Exporting Records Please wait...');
                   // filter_array = Ext.JSON.encode(filter_array);
                   //  Ext.Ajax.request({
                   //    url: 'openoffice/exportall',
                   //    method: 'POST',
                   //    params : {
                   //                'header':header,
                   //                'section_id':sectionid,
                   //                'filters':filters,
                   //                'filter':filter_array,
                   //                'Category': Category_id,
                   //                'BsnType': BsnType_id,
                   //                'BsnCategory': BsnCategory_id,
                   //                'BsnScale_id':BsnScale_id,
                   //                'issueplace':zone_id,
                   //                'headingText': 'PREMISE APPLICATIONS SPREADSHEET',
                   //                'function':'getPremiseApplicationColumns',
                   //                'filename':'PremiseProdductsSpreadsheet'
                   //  },
                      
                   //     success: function (response, textStatus, request) {
                   //      var t = JSON.parse(response.responseText);
                   //      var a = document.createElement("a");
                   //      a.href = t.file; 
                   //      a.download = t.name;
                   //      document.body.appendChild(a);

                   //      a.click();
                     
                   //      a.remove();
                   //     Ext.getBody().unmask();
      
                   //    },
                   //    failure: function(conn, response, options, eOpts) {
                   //         Ext.getBody().unmask();
                   //         Ext.Msg.alert('Error', 'please try again');
                   //    }});
        

             },
             func_clearfilters: function(btn) {
               grid = this.lookupReference('premisegridpanel');
                
                 var t=grid.down('headercontainer').getGridColumns();

                 for (var i = t.length - 1; i >= 2; i--) {
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
                console.log('reser');
               Ext.apply(Ext.getStore('spreadsheetpremiseapplicationcolumnsstr'), {pageSize: pagesize});
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