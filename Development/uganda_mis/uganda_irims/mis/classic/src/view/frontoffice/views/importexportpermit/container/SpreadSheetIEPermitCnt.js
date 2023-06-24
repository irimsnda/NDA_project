Ext.define('Admin.view.frontoffice.importexportpermit.container.SpreadSheetIEPermitCnt', {
    extend: 'Ext.form.Panel',
    xtype: 'spreadsheetiepermitcnt',
    layout:'border',
    controller: 'spreadsheetiepermitctr',
            tbar: [{
                    xtype: 'combobox',
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'sub_module',
                    widht: 250,
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
                                        filters: '{"module_id":4}'
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
                       handler: 'func_exportiepermitspreadsheet'
                    },{
                       xtype: 'button', 
                       text: 'Export Detailed Report(All)',
                       name: 'detailed',
                       ui: 'soft-purple',
                       iconCls: 'x-fa fa-refresh', 
                       handler: 'func_exportiepermitspreadsheet'
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
                      xtype: 'spreadsheetiepermitapplicationsections',
                      height: 150,
                      region: 'north'
                   },
                   {
                      xtype: 'spreadsheetiepermitvisiblecolumns',
                        height: 200,
                      region: 'center'
                   },{
                    xtype: 'iepermitadditionalfiltersview',
                    height: 200,
                    region: 'south'
                   }]
               },{
                  xtype: 'spreadsheetiepermitview',
                  region:'center', 
               }]
});