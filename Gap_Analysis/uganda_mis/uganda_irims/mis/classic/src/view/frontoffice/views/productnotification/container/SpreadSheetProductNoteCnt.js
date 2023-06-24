Ext.define('Admin.view.frontoffice.productnotification.container.SpreadSheetProductNotificationCnt', {
    extend: 'Ext.panel.Panel',
    xtype: 'spreadsheetproductnotecnt',
    layout:'border',
    controller: 'spreadsheetproductnotectr',
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
                                        filters: '{"module_id":7}'
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
                        select: 'loadApplicationColumns'
                      
                       }
                 },'->',
                     { 
                       xtype: 'button', 
                       text: 'Export Summary',
                       name: 'summary',
                       ui: 'soft-purple',
                       iconCls: 'x-fa fa-cloud-upload', 
                       handler: 'func_exportCTspreadsheet'
                    },{
                       xtype: 'button', 
                       text: 'Export Detailed Report(All)',
                       name: 'detailed',
                       ui: 'soft-purple',
                       iconCls: 'x-fa fa-refresh', 
                       handler: 'func_exportCTspreadsheet'
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
                  items: [
                   {
                    	xtype: 'spreadsheetproductnotevisiblecolumns',
                        height: 250,
                        region: 'north'
                   },{
                      xtype: 'productnoteadditionalfilters',
                        height: 200,
                        region: 'center'
                   },
                   ]
               },{
                  xtype: 'spreadsheetproductnoteview',
                  region:'center',
               }
               ]
});