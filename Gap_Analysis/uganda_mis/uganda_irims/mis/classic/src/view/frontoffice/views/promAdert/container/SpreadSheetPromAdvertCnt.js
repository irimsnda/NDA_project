Ext.define('Admin.view.frontoffice.product.container.SpreadSheetPromAdvertCnt', {
    extend: 'Ext.form.Panel',
    xtype: 'spreadsheetpromadvertcnt',
    layout:'border',
    controller: 'spreadsheetpromadvertctr',
            tbar: [{
                    xtype: 'combobox',
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'sub_module',
                    widht: 200,
                    fieldLabel: 'Applcation Type',
                    value: 'New',
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
                                        filters: '{"module_id":14}'
                                    }
                                    
                                }
                            },
                            isLoad: true
                        },
                        beforequery: function() {
                          var store=this.getStore();
                          
                            var all={name: 'All',id:0};
                              store.insert(0, all);
                            },
                        change: 'reloadSheetStore',
                      
                       }
                 },'->',
                  { 
                       xtype: 'button', 
                       text: 'Export Summary',
                       ui: 'soft-purple',
                       name: 'summary',
                       iconCls: 'x-fa fa-cloud-upload', 
                       handler: 'func_exportproductspreadsheet'
                    },{ 
                       xtype: 'button', 
                       text: 'Export Detailed Report(All)',
                       ui: 'soft-purple',
                       name: 'detailed',
                       iconCls: 'x-fa fa-cloud-upload', 
                       handler: 'func_exportproductspreadsheet'
                    },{
                       xtype: 'button', 
                       text: 'clear Filter',
                       ui: 'soft-purple',
                       iconCls: 'x-fa fa-refresh', 
                       handler: 'func_clearfilters'
                    }
                  ],
               items: [{
                  xtype: 'panel',
                  titleCollapse: true,
                  region:'west',
                   height: '100%',
                  preventHeader: true, 
                  width: 200,
                  border: true,
                  split: true,
                  layout:'border',
                  items: [{
                    	xtype: 'spreadsheetapplicationtypes',
                    	height: 150,
                      region: 'north'
                   },{
                    	xtype: 'spreadsheetpromadvertvisiblecolumns',
                      height: 200,
                      region: 'center'
                   },{
                      xtype: 'promadvertadditionalfilters',
                      height: 200,
                      region: 'south'
                   }]
               },{
                  xtype: 'spreadsheetpromadvertview',
                  region:'center',
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
                  border: true,
                  region: 'east',
                  layout: 'accordion',
                  items:[,{
                  	xtype: 'productparticularsview',
                  	height: 250
                  },
                  {
                  	xtype: 'promotionmaterialdetailsview',
                  	height: 250
                  }
                  ]
                 
               }]
});