Ext.define('Admin.view.frontoffice.gmp.container.SpreadSheetGmpCnt', {
    extend: 'Ext.form.Panel',
    xtype: 'spreadsheetgmpcnt',
    layout:'border',
    controller: 'spreadsheetgmpctr',
            tbar: [{
                    xtype: 'combobox',
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'sub_module',
                    widht: 200,
                    fieldLabel: 'Application Type',
                    labelStyle: 'margin-left:20px',
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
                                        filters: '{"module_id":3}'
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
                       name: 'summary',
                       ui: 'soft-purple',
                       iconCls: 'x-fa fa-cloud-upload', 
                       handler: 'func_exportgmpspreadsheet'
                    },{
                       xtype: 'button', 
                       text: 'Export Detailed Report(All)',
                       name: 'detailed',
                       ui: 'soft-purple',
                       iconCls: 'x-fa fa-refresh', 
                       handler: 'func_exportgmpspreadsheet'
                    },{
                       xtype: 'button', 
                       text: 'clear Filter',
                       ui: 'soft-purple',
                       iconCls: 'x-fa fa-print', 
                       handler: 'func_clearfilters'
                    }
                  ],
               items: [{
                  xtype: 'panel',
                  titleCollapse: true,
                  title: 'View Options',
                  region:'west',
                  collapsible: true, 
                  preventHeader: true, 
                  width: 200,
                  border: true,
                  split: true,
                  layout: 'border',
                  items: [{
                    	xtype: 'spreadsheetgmpapplicationtypes',
                    	region: 'north',
                      height: 150
                   },
                   {
                    	xtype: 'spreadsheetgmpvisiblecolumns',
                      height:300,
                      region: 'center'
                   },{
                    xtype:'gmpadditionalfiltersview',
                    height: 200,
                    region: 'south'
                   }

                   ]
               },{
                  xtype: 'gmpspreadsheetview',
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
                  items:[{
                   xtype: 'gmpbsntypedetailsview',
                   height:150
                  },
                  {
                  	xtype: 'gmpmanufacturingblockview',
                  	height: 150
                  },
                  {
                  	xtype: 'gmpmanufucturinglineview',
                  height: 150
                  },{
                  	xtype: 'gmpmansiteproductview',
                  	height: 150
                  },{
                    xtype: 'gmInspectionTeamGrid',
                    height: 150
                  }
                  ]
                 
               }]
});