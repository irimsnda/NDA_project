Ext.define('Admin.view.reports.appsreport.disposalreport.panel.DisposalReportPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'disposalreportpnl',
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
            value: 15
        },
      {
            xtype: 'disposaltreportfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'disposaltabpnl',
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
            handler: 'printDisposalSummary',
           
            
        },
          {
            xtype:'button',
            ui: 'soft-green',
            text: 'Export Summary Report',
            iconCls: 'x-fa fa-file',
            handler: 'exportDisposalSummaryReport',
            xFileName: 'Disposal Applications SummaryReport'
           
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
                            filters: JSON.stringify({'module_id':15})
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
             handler: 'expDisposalWinShow',
            childXtype: 'detaileddisposalreportfrm',
            winTitle: 'Export Detailed Report',
            name: 'DetailedExport',
            module: 'disposalWin',
            winWidth: '70%',
            xFileName: 'DisposalDetailedReport',
            xPrintFunc: 'disposalDetailedReportPreview',
            xspreadsheet: 'detaileddisposalviewgrid',
            xvisibleColumns: 'detaileddisposalcolumnsfrm',
            xheading:'Disposal Application Detailed Report'
            
            
        }

       
    ]
     }
    ],

 });