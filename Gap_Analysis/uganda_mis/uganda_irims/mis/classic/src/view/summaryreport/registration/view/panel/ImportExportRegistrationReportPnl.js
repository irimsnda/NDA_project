Ext.define('Admin.view.summaryreport.registration.view.panel.ImportExportRegistrationReportPnl', {
	extend: 'Ext.form.Panel',
	xtype: 'importexport_reg_reportPnl',
	margin: 2,
	layout: 'border',
    controller: 'registrationreportviewctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
             xtype: 'hiddenfield',
             name: 'module_id',
             value: 4,
             hidden: true
         },{
            xtype: 'importexportregistrationreportFiltersFrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },{
            xtype: 'importexportregistrationreportRepresentationViewFrm',
            region: 'center'
        }],
  bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        items: [
        {
            xtype:'externalExportBtn',
            text: 'Print(Grid Summary)',
            containerName: 'form',
            gridName: 'gridpanel' 
            
            
        },{
            xtype:'button',
            ui: 'soft-green',
            iconCls: 'x-fa fa-file',
            text: 'Print(Summary)',
            handler: 'printIERegSummaryReport'
        },
        '->',
        {
            xtype: 'combo',
            fieldLabel: 'Classification Process',
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
                                },
                                
                afterrender: 'pickFirstEntryOnCombo',
                change: 'func_toggleExportBtn'
            }
        },{
          text: 'Export Filtered',
          handler: 'func_exportHeaderlessReport',
          module: 'importexport',
          xFileName: 'ImportExportSummaryReport',
          xPrintFunc: 'exportImportExportDefinedColumns',
          xheading:'ImportExport Application Summary Report',
          margin: '0 ,0 ,0 ,0',
        },'->',{
            text: 'Export Detailed Report',
            handler: 'func_ExpWinShow',
            childXtype: 'detailedimportexportRegistrationReportExportFrm',
            winTitle: 'Export Detailed Report',
            name: 'DetailedExport',
            module: 'importexportWin',
            winWidth: '70%',
            xstore: 'spreadsheetieapplicationcolumnsstr',
            xFileName: 'ImportExportSummaryReport',
            xPrintFunc: 'exportImportExportDefinedColumns',
            xspreadsheet: 'spreadsheetieview',
            xvisibleColumns: 'spreadsheetievisiblecolumns',
            xheading:'Import/Export Application Summary Report'
        }
    ]
     }],
     listeners: {
       // afterrender: 'func_InitloadStore'
     }

 });