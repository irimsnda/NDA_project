Ext.define('Admin.view.summaryreport.application.view.panel.IEReportPnl', {
	extend: 'Ext.form.Panel',
	xtype: 'ie_reportPnl',
	margin: 2,
	layout: 'border',
    controller: 'reportviewctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
            xtype:'hiddenfield',
            name: 'cartesianStr',
            value: 'iereportchartstr'
        },{
            xtype:'hiddenfield',
            name: 'gridStr',
            value: 'iereportgridstr'
        },{
             xtype: 'textfield',
             name: 'module_id',
             value: 4,
             hidden: true
         },{
            xtype: 'reportFilters',
            region: 'north'
         },{
            xtype: 'reportRepresentationView',
            region: 'center'
        }],
  bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        added: 'alerta',
        items: [
         {
            xtype:'externalExportBtn',
            text: 'Print(Summary)',
            containerName: 'form',
            gridName: 'gridpanel' 
            
            
        },
        '->',
        {
            xtype: 'combo',
            emptyText: 'Reg Details',
            width: 150,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'regDetails',
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
                            table_name: 'par_approval_decisions'
                        }
                       }
                    },
                    isLoad: true
                }
            }
        },
        
        
        {
            text: 'Print Detailed Report',
            handler: 'func_ExpWinShow'
            
        },{
            text: 'Export Detailed Report',
            handler: 'func_ExpWinShow',
            childXtype: 'detailedReportExport',
            winTitle: 'Export Detailed Report',
            winWidth: '70%',
            xstore: 'spreadsheetieapplicationcolumnsstr',
            xFileName: 'ImportExportSummaryReport',
            xPrintFunc: 'getIESpreadSheet',
            xspreadsheet: 'spreadsheetieview',
            xvisibleColumns: 'spreadsheetievisiblecolumns',
            xheading:'Import/Export Application Summary Report'
        }
    ]
     }],
     listeners: {
        afterrender: 'func_InitloadStore'
     }

 });