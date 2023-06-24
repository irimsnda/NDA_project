Ext.define('Admin.view.summaryreport.application.view.panel.ProductReportPnl', {
	extend: 'Ext.form.Panel',
	xtype: 'product_reportPnl',
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
            value: 'productreportchartstr'
        },{
            xtype:'hiddenfield',
            name: 'gridStr',
            value: 'productreportgridstr'
        },{
             xtype: 'textfield',
             name: 'module_id',
             value: 1,
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
            xtype: 'combo',
            emptyText: 'Classification',
            width: 150,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'Classification',
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
                            table_name: 'par_classifications'
                        }
                       }
                    },
                    isLoad: true
                }
            }
        },
        
        {
            text: 'Print Detailed Report',
            handler: 'func_exportSummaryReport',
            xFileName: 'ProductSummaryReport',
            xPrintFunc: 'getProductsApplicationColumns',
            xheading:'Premise Application Summary Report'
            
        },{
            text: 'Export Detailed Report',
            handler: 'func_ExpWinShow',
            childXtype: 'detailedReportExport',
            winTitle: 'Export Detailed Report',
            winWidth: '70%',
            xstore: 'spreadsheetproductapplicationcolumnsstr',
            xFileName: 'ProductSummaryReport',
            xPrintFunc: 'getProductsApplicationColumns',
            xspreadsheet: 'spreadsheetview',
            xvisibleColumns: 'spreadsheetproductvisiblecolumns',
            xheading:'Premise Application Summary Report'
        }
    ]
     }],
     listeners: {
        afterrender: 'func_InitloadStore'
     }

 });