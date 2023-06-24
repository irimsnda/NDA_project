Ext.define('Admin.view.reports.appsreport.controlleddrugsreport.panel.ApprovalCertificateReportPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'approvalcertificatereportpnl',
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
            value: 12
        },
      {
            xtype: 'approvalcertificatereportfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },{
            xtype: 'approvalcertificatetabpnl',
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
            handler: 'printApprovalCertificateSummary',
           
            
        },
         {
            xtype:'button',
            ui: 'soft-green',
            text: 'Export Summary Report',
            iconCls: 'x-fa fa-file',
            handler: 'exportApprovalCertificateSummaryReport',
           
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
                            filters: JSON.stringify({'module_id':12})
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
             handler: 'func_ExpControlledDrugsWinShow',
            childXtype: 'detailedcertiicateorderreportfrm',
            winTitle: 'Export Detailed Report',
            name: 'DetailedExport',
            module: 'controlleddrugsWin',
            winWidth: '70%',
            xFileName: 'Controlled Drugs Certificate of Approval Application Detailed Report',
            xPrintFunc: 'controlledDrugsDetailedReportPreview',
            xspreadsheet: 'detailedimportexportviewgrid',
            xvisibleColumns: 'detailedimportexportcolumnsfrm',
            xheading:'Controlled Drugs Certificate of Approval Application Detailed Report'
            
            
        }

       
    ]
     }
    ],

 });