Ext.define('Admin.view.frontoffice.product.container.TobaccoProductSpreadsheet', {
    extend: 'Ext.form.Panel',
    xtype: 'tobaccoproductspreadsheet',
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
                      value: 8
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
                            storeId: 'tobaccoproductspreadsheetstr',
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
                  }
                
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
                          xtype: 'productingridientsview',
                          height: 250
                  },{
                  	xtype: 'productnutrientsview',
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