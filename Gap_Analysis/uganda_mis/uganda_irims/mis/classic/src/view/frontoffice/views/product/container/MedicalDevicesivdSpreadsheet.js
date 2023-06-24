Ext.define('Admin.view.frontoffice.product.container.MedicalDevicesivdSpreadsheet', {
   extend: 'Ext.form.Panel',
   xtype: 'medicaldevicesivdspreadsheet',
   layout:'border',
   controller: 'spreadsheetproductctr',
   tbar: [{
                   xtype: 'combobox',
                   forceSelection: true,
                   queryMode: 'local',
                   displayField: 'name',
                   valueField: 'id',
                   name: 'sub_module',
                   widht: 320,
                   fieldLabel: 'Applcation Type',
                   //value: 'New',
                   listeners:
                    {
                        beforerender: {//getConfigParamFromTable
                           fn: 'setConfigCombosStore',
                           config: {
                               pageSize: 10000,
                               proxy: {
                                   url: 'configurations/getConfigParamFromTable',
                                   extraParams: {
                                       table_name: 'sub_modules',
                                       filters: '{"module_id":1}'
                                   }
                                   
                               }
                           },
                           isLoad: true
                       },
                       beforequery: function() {
                         var store=this.getStore();
                           var all={name: 'All Product Applications(new,renewal ....)',id:0};
                             store.insert(0, all);
                             var all={name: ' Products Registry(Active Applications)',id:103};
                              store.insert(1, all);
                           },
                       change: 'reloadSheetStore',
                      }
                },'->',
                 { 
                      xtype: 'button', 
                      text: 'Export Summary',
                      ui: 'soft-purple',
                      name: 'summary',
                      gridXtype: 'spreadsheetview',
                      iconCls: 'x-fa fa-cloud-upload', 
                      handler: 'func_exportproductspreadsheet'
                   },{ 
                      xtype: 'button', 
                      text: 'Export Detailed Report(All)',
                      ui: 'soft-purple',
                      gridXtype: 'spreadsheetview',
                      name: 'detailed',
                      iconCls: 'x-fa fa-cloud-upload', 
                      handler: 'func_exportproductspreadsheet'
                   },{
                      xtype: 'button', 
                      text: 'clear Filter',
                      ui: 'soft-purple',
                      name: 'clearFilter',
                      iconCls: 'x-fa fa-refresh', 
                      handler: 'func_clearfilters'
                   },{
                     xtype: 'hiddenfield',
                     name: 'section_id',
                     value: 4
                   }
                 ],
              items: [{
                 xtype: 'panel',
                 titleCollapse: true,
                 title: 'View free Options',
                 region:'west',
                 collapsible: true, 
                  height: '100%',
                 preventHeader: true, 
                 width: 200,
                 border: true,
                 split: true,
                 layout:'border',
                 items: [{
                      xtype: 'spreadsheetproductvisiblecolumns',
                     height: 200,
                     region: 'center'
                  },{
                     xtype: 'productadditionalfiltersview',
                     height: 200,
                     region: 'south'
                  }]
              },{
                 xtype: 'spreadsheetview',
                 region:'center',
                 listeners: {
                  beforerender: {
                      fn: 'setCommonGridsStore',
                      config: {
                          pageSize: 1000,
                          storeId: 'medicaldevicesivdspreadsheetstr',
                          proxy: {
                            url: 'openoffice/getProductsApplicationColumns',
                            headers: {
                                'Authorization':'Bearer '+access_token
                            },
                            reader: {
                                type: 'json',
                                idProperty: 'id',
                                rootProperty: 'results',
                                messageProperty: 'message',
                                totalProperty: 'totalResults'
                            }
                          }
                      },
                      isLoad: true
                  }
                },
                 bbar: [{
                         xtype: 'pagingtoolbar',
                         width: '100%',
                         displayInfo: true,
                         displayMsg: 'Showing {0} - {1} out of {2}',
                         emptyMsg: 'No Records',
                           beforeLoad: function () {
                                     var store = this.getStore(),
                                     range = this.down('combo[name=Range]').getValue();
                                      var grid=this.up('grid'),
                                      Classification_id=grid.down('combo[name=Classification_id]').getValue(),
                                       Category_id=grid.down('combo[name=Category_id]').getValue(),
                                       ProductForm_id=grid.down('combo[name=ProductForm_id]').getValue(),
                                       ProductType_id=grid.down('combo[name=ProductType_id]').getValue(),
                                       SpecialCategory_id=grid.down('combo[name=SpecialCategory_id]').getValue(),
                                       zone_id=grid.down('combo[name=zone_id]').getValue(),
                                       registration_status=grid.down('combo[name=registration_status]').getValue(),
                                       validity_status=grid.down('combo[name=validity_status]').getValue(),
                                       assessment_procedure_id = grid.down('combo[name=assessment_procedure]').getValue(),
                                       application_status=grid.down('combo[name=application_status]').getValue(),
                                       retention_status=grid.down('combo[name=retention_status]').getValue(),
                                       SubCategory_id=grid.down('combo[name=SubCategory_id]').getValue();

                                    //acquire original filters
                                    var filter = {'t1.section_id':1,'t1.sub_module_id':sub_module};
                                    var   filters = JSON.stringify(filter);
   
                                     store.getProxy().extraParams = {
                                                 pageSize:range,
                                                 Classification: Classification_id,
                                                 Category: Category_id,
                                                 ProductForm: ProductForm_id,
                                                 ProductType: ProductType_id,
                                                 SpecialCategory: SpecialCategory_id,
                                                 SubCategory: SubCategory_id,
                                                 issueplace:zone_id,
                                                 registration_status:registration_status,
                                                 validity_status:validity_status,
                                                 application_status: application_status,
                                                 filters: filters,
                                                 retention_status: retention_status,
                                                 section_id: 1,
                                                 assessment_procedure_id: assessment_procedure_id
                                               };
                                     },

                             items:[{
                                  xtype: 'combobox',
                                  forceSelection: true,
                                  fieldLabel: 'Range',
                                  displayField: 'size',
                                  valueField: 'size',
                                  name: 'Range',
                                  queryMode: 'local',
                                  value: 25,
                                  listeners:{
                                     afterrender: {//getConfigParamFromTable
                                              fn: 'setConfigCombosStore',
                                             config: {
                                                 proxy: {
                                                     url: 'commonparam/getCommonParamFromTable',
                                                     extraParams: {
                                                         table_name: 'par_page_sizes'
                                                     }
                                                 }
                                             },
                                             isLoad: true
                                         },
                                     select: 'setPageSize'
                                    }
                             }]                  
                     }
                     ]
              },
              {
                 title: 'Additional Information',
                 xtype: 'panel',
                 collapsible: true, 
                 collapsed: true,
                 titleCollapse: true,
                 width:250,
                 split: true,
                 autoScroll : true,
               //  preventHeader: true, 
                 border: true,
                 region: 'east',
                 layout: 'accordion',
                 items:[{
                         xtype: 'productingridientsview', hidden: true,
                         height: 250
                 },{
                    xtype: 'productnutrientsview',
                    hidden: true,
                    height: 250
                 },
                 {
                    xtype: 'productpackagingview',
                    height: 250
                 },
                 {
                    xtype: 'productmanufacturerview',
                   height: 250
                 },{
                    xtype: 'productinspectionview',
                    height: 150
                 },{
                 xtype: 'productsampleinfoview',
                 height: 250
               },{
                 xtype: 'productImageview',
                 height: 250
               }]
                
         }]
});