Ext.define('Admin.view.reports.appsreport.importexportreport.panel.ImportExportReportPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'importexportreportpnl',
    margin: 2,
    layout: 'border',
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [
     {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 4
        },
      {
            xtype: 'importexportreportfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },{
            xtype: 'importexporttabpnl',
            region: 'center'
        }],
  bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        items: [
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Summary Report',
            iconCls: 'x-fa fa-print',
            handler: 'printImportExportSummary',
           
            
        },
         {
            xtype:'button',
            ui: 'soft-green',
            text: 'Export Summary Report',
            iconCls: 'x-fa fa-file',
            handler: 'func_exportImportExportSummaryReport',
           
        },
        '->',
        {
            xtype: 'combo',
            fieldLabel: 'Process',
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
                            filters: JSON.stringify({'module_id':4})
                        }
                       }
                    },
                    isLoad: true
                },
                beforequery: function() {
                                var store=this.getStore();
                            
                                },
                                
                afterrender: 'pickFirstEntryOnCombo',
                change: 'func_toggleExportBtn'
            }
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Preview & Export Detailed Report',
             handler: 'func_ExpImportExportWinShow',
            childXtype: 'detailedimportexportreportfrm',
            winTitle: 'Export Detailed Report',
            name: 'DetailedExport',
            module: 'importexportWin',
            winWidth: '70%',
            xFileName: 'Import Export Detailed Report',
            xPrintFunc: 'importExportDetailedReportPreview',
            xspreadsheet: 'detailedimportexportviewgrid',
            xvisibleColumns: 'detailedimportexportcolumnsfrm',
            xheading:'Import & Export Application Detailed Report'
            
            
        }

       
    ]
     }
    ],

 });