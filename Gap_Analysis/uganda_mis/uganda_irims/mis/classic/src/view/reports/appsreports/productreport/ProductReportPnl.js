Ext.define('Admin.view.reports.appsreport.productreport.panel.ProductReportPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'productreportpnl',
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
            value: 1
        },
      {
            xtype: 'productreportfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'producttabpnl',
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
            handler: 'printProductSummary',
           
            
        },
          {
            xtype:'button',
            ui: 'soft-green',
            text: 'Export Summary Report',
            iconCls: 'x-fa fa-file',
            handler: 'exportProductSummaryReport',
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
                            filters: JSON.stringify({'module_id':1})
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
             handler: 'expProductWinShow',
            childXtype: 'detailedproductreportfrm',
            winTitle: 'Export Detailed Report',
            name: 'DetailedExport',
            module: 'productWin',
            winWidth: '70%',
            xFileName: 'ProductDetailedReport',
            xPrintFunc: 'productDetailedReportPreview',
            xspreadsheet: 'detailedproductviewgrid',
            xvisibleColumns: 'detailedproductcolumnsfrm',
            xheading:'Product Application Detailed Report'
            
            
        }

       
    ]
     }
    ],

 });