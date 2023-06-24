Ext.define('Admin.view.summaryreport.registration.view.panel.ModuleRegistrationReportPnl', {
	extend: 'Ext.panel.Panel',
	xtype: 'moduleregreportPnl',
	margin: 2,
	layout: 'border',
    controller: 'registrationreportviewctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
            xtype: 'moduleregistrationreportFiltersFrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },{
            xtype: 'moduleregistrationreporttabs',
            region: 'center'
        }],
  bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        items: [
        {
            xtype:'externalExportBtn',
            text: 'Export(Grid Summary)',
            containerName: 'form',
            gridName: 'gridpanel' 
            
            
        },
         {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print(Summary)',
            iconCls: 'x-fa fa-file',
            handler: 'printModuleRegSummary'
        },
        '->',
        {
            xtype: 'combo',
            //fieldLabel: 'Module',
            emptyText: 'Export Module',
            labelAlign : 'left',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            margin: '0 ,0 ,0 ,0',
            name: 'export_module_id',
            allowBlank: false,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                   config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'modules'
                        }
                       }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            emptyText: 'Classification Process',
            labelAlign : 'left',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            margin: '0 ,0 ,0 ,0',
            name: 'classification_process',
            allowBlank: false,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                   config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_process_classifications',
                            filters: JSON.stringify({'is_enabled':1})
                        }
                       }
                    },
                    isLoad: true
                },
                beforequery: function() {
                                var store=this.getStore();
                                
                                var all={name: 'All',id:0};
                                  store.insert(0, all);
                                }
            }
        },{
          text: 'Export Details',
          handler: 'func_exportModuleRegReport',
        }
    ]
     }],

 });