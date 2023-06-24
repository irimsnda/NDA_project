Ext.define('Admin.view.reports.appsreport.premisesreport.panel.PremisesReportPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'premisesreportpnl',
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
            value: 2
        },
      {
            xtype: 'premisesreportfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'premisestabpnl',
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
            handler: 'printPremiseSummary',
           
            
        },
        //  {
        //     xtype:'externalExportBtn',
        //     ui: 'soft-green',
        //     text: 'Export',
        //     iconCls: 'x-fa fa-file',
        //     containerName: 'panel',
        //     gridName: 'producttabularrepresentationgrid' 
           
        // },
          {
            xtype:'button',
            ui: 'soft-green',
            text: 'Export Summary Report',
            iconCls: 'x-fa fa-file',
            handler: 'exportPremiseSummaryReport',
            xFileName: 'ProductSummaryReport'
           
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
                            filters: JSON.stringify({'module_id':2})
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
             handler: 'ExpPremiseWinShow',
            childXtype: 'detailedpremisereportfrm',
            winTitle: 'Export Detailed Report',
            name: 'DetailedExport',
            module: 'premiseWin',
            winWidth: '70%',
            xFileName: 'PremiseDetailedReport',
            xPrintFunc: 'premiseDetailedReportPreview',
            xspreadsheet: 'detailedpremiseviewgrid',
            xvisibleColumns: 'detailedpremisecolumnsfrm',
            xheading:'Premise Application Detailed Report'
            
            
        }

       
    ]
     }
    ],

 });