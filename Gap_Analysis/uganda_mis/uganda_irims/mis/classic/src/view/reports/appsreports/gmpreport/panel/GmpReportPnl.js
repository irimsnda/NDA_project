Ext.define('Admin.view.reports.appsreport.gmpreport.panel.GmpReportPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'gmpreportpnl',
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
            value: 3
        },
      {
            xtype: 'gmpreportfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },{
            xtype: 'gmptabpnl',
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
            handler: 'printGmpSummary',
           
            
        },
         {
            xtype:'button',
            ui: 'soft-green',
            text: 'Export Summary Report',
            iconCls: 'x-fa fa-file',
            handler: 'func_gmpSummaryReport',
           
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
                            filters: JSON.stringify({'module_id':3})
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
             handler: 'func_ExpGmpWinShow',
            childXtype: 'detailedgmpreportfrm',
            winTitle: 'Export Detailed Report',
            name: 'DetailedExport',
            module: 'gmpWin',
            winWidth: '70%',
            xFileName: 'GMP Detailed Report',
            xPrintFunc: 'gmpDetailedReportPreview',
            xspreadsheet: 'detailedgmpviewgrid',
            xvisibleColumns: 'detailedgmpcolumnsfrm',
            xheading:'GMP Application Detailed Report'
            
            
        }

       
    ]
     }
    ],

 });