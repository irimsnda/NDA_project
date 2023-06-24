var sectionid='';
var sub_module='';
Ext.define('Admin.view.openOffice.product.controller.SpreadSheetProductCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spreadsheetproductctr',

         reloadSheetStore: function(combo,newValue,old,eOpts) {
           var form=combo.up('form'),
                store=form.down('pagingtoolbar').getStore();
                sub_module=newValue;
                if(newValue==0){
                  sub_module='';
                }
           store.load();
         },    setParamCombosStore: function (obj, options) {
          this.fireEvent('setParamCombosStore', obj, options);
      },  
      funcAddSectionIdFilter:function(me){
        var store = me.getStore();
            mainTabPnl = me.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            section_id =containerPnl.down('hiddenfield[name=section_id]').getValue();
            var filter = {'section_id':section_id};
            var filters = JSON.stringify(filter);
//{params:{filters:filters}}
            store.load();
            
    },
      setCommonGridsStore: function (obj, options) {
          this.fireEvent('setCommonGridsStore', obj, options);
      },   
          loadApplicationColumns: function(sender,record) {
               sectionid=record.data['id'];
               if(sectionid==0){
                sectionid='';
               }
              //load filters to other depedent stores
              var filter = {'t1.section_id':sectionid};
              var   filters = JSON.stringify(filter);
              var form =this.lookupReference('gridpanel'),
               Classificationstore=form.down('combo[name=Classification_id]').getStore(),
               Categorystore=form.down('combo[name=Category_id]').getStore(),
               ProductFormstore=form.down('combo[name=ProductForm_id]').getStore(),
               ProductTypestore=form.down('combo[name=ProductType_id]').getStore(),
               subcategorystore=form.down('combo[name=SubCategory_id]').getStore(),
               SpecialCategorystore=form.down('combo[name=SpecialCategory_id]').getStore(),
               issueplacestore=form.down('combo[name=zone_id]').getStore();

               Classificationstore.removeAll();
               Categorystore.removeAll();
               ProductFormstore.removeAll();
               ProductTypestore.removeAll();
               SpecialCategorystore.removeAll();
               subcategorystore.removeAll();
               issueplacestore.removeAll();

               Classificationstore.load({params:{filters:filters,table_name: 'par_classifications'}});
               Categorystore.load({params:{filters:filters,table_name: 'par_product_categories'}});
               ProductFormstore.load({params:{filters:filters,table_name: 'par_product_forms'}});
               ProductTypestore.load({params:{table_name: 'par_product_types'}});
               subcategorystore.load({params:{filters:filters,table_name: 'par_subproduct_categories'}});
               SpecialCategorystore.load({params:{filters:filters,table_name: 'par_productspecial_categories'}});
               issueplacestore.load({params:{table_name: 'par_zones'}});

               //loading grid
               sub_module=this.getView().down('combo[name=sub_module]').getValue();
              //add filters
              var filter = {'t1.section_id':sectionid,'t1.sub_module_id':sub_module};
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetproductapplicationcolumnsstr').load({params:{filters:filters}});

            },
          loadadditionalinfo:  function(sender,record) {
              var productid=record.data['product_id'];
              var filter = { 't1.product_id':productid };
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetmaninfostr').reload({params:{filters:filters}});
              Ext.data.StoreManager.lookup('spreadsheetproductnutrientsstr').reload({params:{filters:filters}});
              Ext.data.StoreManager.lookup('spreadsheetproductpackagingstr').reload({params:{filters:filters}});
              Ext.data.StoreManager.lookup('spreadsheetproductingridientsstr').reload({params:{filters:filters}});
              Ext.data.StoreManager.lookup('spreadsheetproductsampleinfostr').reload({params:{filters:filters}});
              Ext.data.StoreManager.lookup('productimageviewstr').reload({params:{filters:filters}});
              var filter = { 't9.product_id':productid };
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetproductinspectionstr').reload({params:{filters:filters}});
            },
          loadadditionalMedicalDeviceinfo:  function(sender,record) {
              var productid=record.data['product_id'];
              var filter = { 't1.product_id':productid };
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetmaninfostr').reload({params:{filters:filters}});
              //Ext.data.StoreManager.lookup('spreadsheetproductnutrientsstr').reload({params:{filters:filters}});
              //Ext.data.StoreManager.lookup('spreadsheetproductpackagingstr').reload({params:{filters:filters}});
              //Ext.data.StoreManager.lookup('spreadsheetproductingridientsstr').reload({params:{filters:filters}});
              //Ext.data.StoreManager.lookup('spreadsheetproductsampleinfostr').reload({params:{filters:filters}});
              Ext.data.StoreManager.lookup('productimageviewstr').reload({params:{filters:filters}});
              var filter = { 't9.product_id':productid };
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetproductinspectionstr').reload({params:{filters:filters}});
            },
          
          func_showhideSpreasheetColumn: function (chk, value) {
                  var  chk_name = chk.name;
                  var grid =this.lookupReference('gridpanel');
                  grid.columns[chk_name].setVisible(value);
            },
         
          func_exportproductspreadsheet: function (btn) {

                 var name=btn.name;
                  //var grid = this.lookupReference('gridpanel'),
                  var form = btn.up('form'),
                      grid = form.down("#spreadsheetgrid"),
                      sectionid = form.down('hiddenfield[name=section_id]').getValue(),
                      filterfield = grid.getPlugin('filterfield');
                  console.log(filterfield)
                  console.log(grid);
                  
                     var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config');
                     var  Classification_id=grid.down('combo[name=Classification_id]').getValue(),
                      Category_id=grid.down('combo[name=Category_id]').getValue(),
                      ProductForm_id=grid.down('combo[name=ProductForm_id]').getValue(),
                      ProductType_id=grid.down('combo[name=ProductType_id]').getValue(),
                      SpecialCategory_id=grid.down('combo[name=SpecialCategory_id]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue(),
                      SubCategory_id=grid.down('combo[name=SubCategory_id]').getValue(),
                      registration_status=grid.down('combo[name=registration_status]').getValue(),
                      validity_status=grid.down('combo[name=validity_status]').getValue(),
                      application_status=grid.down('combo[name=application_status]').getValue(),
                      retention_status=grid.down('combo[name=retention_status]').getValue(),
                      assessment_procedure_id=grid.down('combo[name=assessment_procedure]').getValue();



                      //existing filters
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
                  var header2=[];
                 }
                //Ext.getBody().mask('Exporting Records Please wait...');
                xheading = 'PRODUCTS APPLICATIONS SPREADSHEET';
                print_report('openoffice/exportall?header='+encodeURIComponent(JSON.stringify(header2))+'&filters='+encodeURIComponent(filters)+'&filter='+encodeURIComponent(JSON.stringify(filter_array))+'&function=getProductsApplicationColumns&filename=ProdductsSpreadsheet&headingText='+xheading+'&Classification='+ Classification_id+'&Category='+ Category_id+'&ProductForm='+ ProductForm_id+'&ProductType='+ ProductType_id+'&SpecialCategory='+ SpecialCategory_id+'&SubCategory='+ SubCategory_id+'&issueplace='+zone_id+'&registration_status='+registration_status+'&validity_status='+validity_status+'&application_status='+application_status+'&retention_status='+retention_status+'&assessment_procedure_id='+assessment_procedure_id);

                   // var header= Ext.encode(header2);
                   // filter_array = Ext.JSON.encode(filter_array);
                   //  Ext.Ajax.request({
                   //    url: 'openoffice/exportall',
                   //    method: 'POST',
                   //    params : {
                   //                'header':header,
                   //                'section_id':sectionid,
                   //                'filters':filters,
                   //                'filter':filter_array,
                   //                'Classification': Classification_id,
                   //                'Category': Category_id,
                   //                'ProductForm': ProductForm_id,
                   //                'ProductType': ProductType_id,
                   //                'SpecialCategory': SpecialCategory_id,
                   //                'SubCategory': SubCategory_id,
                   //                'issueplace':zone_id,
                   //                'headingText': 'PRODUCTS APPLICATIONS SPREADSHEET',
                   //                'function':'getProductsApplicationColumns',
                   //                'filename':'ProdductsSpreadsheet'

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
                   //         Ext.Msg.alert('Error', 'please try again');
                   //         Ext.getBody().unmask();
                   //    }});
        

             },

                 
             func_clearfilters: function(btn) {
             
                grid = this.lookupReference('gridpanel');
                
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
               Ext.apply(Ext.getStore('spreadsheetproductapplicationcolumnsstr'), {pageSize: pagesize});
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
     setReportGlobalStore12: function (me, options) {
        var me = me.up('grid');
        alert('ff');
        var config = {
                        pageSize: 1000,
                        storeId: 'medicaldevicespreadsheetproductapplicationcolumnsstr',
                        proxy: {
                            url: 'openoffice/getProductsApplicationColumns'
                        }
                      },
            isLoad = options.isLoad,
            toolbar =  Ext.ComponentQuery.query("#mdSpreadsheetToolbar")[0],
            store = Ext.create('Admin.store.summaryreport.ReportsGlobalAbstractStr', config);
        me.setStore(store);
        toolbar.setStore(store);
        console.log(store.getStore());
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    }, editpreviewProductInformation: function (item) {
      this.fireEvent('editpreviewProductInformation', item);
  },

});