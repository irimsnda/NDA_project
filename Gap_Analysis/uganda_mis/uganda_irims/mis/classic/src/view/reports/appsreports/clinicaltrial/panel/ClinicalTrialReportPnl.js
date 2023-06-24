Ext.define('Admin.view.reports.appsreport.clinicaltrialreport.panel.ClinicalTrialReportPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialreportpnl',
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
            value: 7
        },
      {
            xtype: 'clinicaltrialreportfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },{
            xtype: 'clinicaltrialtabpnl',
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
            handler: 'printClinicalTrialSummary',
           
            
        },
         {
            xtype:'button',
            ui: 'soft-green',
            text: 'Export Summary Report',
            iconCls: 'x-fa fa-file',
            handler: 'func_clinicalTrialSummaryReport',
           
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
                            filters: JSON.stringify({'module_id':7})
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
             handler: 'func_ExpClinicalTrialWinShow',
            childXtype: 'detailedclinicaltrialreportfrm',
            winTitle: 'Export Detailed Report',
            name: 'DetailedExport',
            module: 'clinicaltrialWin',
            winWidth: '70%',
            xFileName: 'Clinical Trial Detailed Report',
            xPrintFunc: 'clinicalTrialDetailedReportPreview',
            xspreadsheet: 'detailedclinicaltrialviewgrid',
            xvisibleColumns: 'detailedclinicaltrialcolumnsfrm',
            xheading:'Clinical Trial Application Detailed Report'
            
            
        }

       
    ]
     }
    ],

 });