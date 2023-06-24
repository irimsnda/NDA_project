Ext.define('Admin.view.frontoffice.survelliance.container.SpreadSheetSurvellianceCnt', {
    extend: 'Ext.form.Panel',
    xtype: 'spreadsheetsurvelliancecnt',
    layout:'border',
    listeners: {
      afterRender: 'initiateGridStores'
    },
    controller: 'spreadsheetsurvelliancectr',
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
                                        filters: '{"module_id":5}'
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
                       handler: 'func_exportSurvelliancespreadsheet'
                    },{
                       xtype: 'button', 
                       text: 'Export Detailed Report(All)',
                       name: 'detailed',
                       ui: 'soft-purple',
                       iconCls: 'x-fa fa-refresh', 
                       handler: 'func_exportSurvelliancespreadsheet'
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
                    	xtype: 'spreadsheetsurvellianceapplicationtypes',
                    	region: 'north',
                      height: 150
                   },
                   {
                    	xtype: 'spreadsheetsurvelliancevisiblecolumns',
                      height:300,
                      region: 'center'
                   },{
                    xtype:'survellianceadditionalfiltersview',
                    height: 200,
                    region: 'south'
                   }

                   ]
               },{
                  xtype: 'survelliancespreadsheetview',
                  region:'center',
               },
               {
                  title: 'Additional Information',
                  xtype: 'panel',
                  collapsible: true, 
                  collapsed: false,
                  titleCollapse: true,
                  width:250,
                  split: true,
                  autoScroll : true,
                  border: true,
                  region: 'east',
                  layout: 'accordion',
                  items:[{
                   xtype: 'survelliancesampleandproductdetailsview',
                   height:150
                  },
                  {
                  	xtype: 'survellianceuploadeddocview',
                  	height: 150
                  }
                  ]
                 
               }]
});