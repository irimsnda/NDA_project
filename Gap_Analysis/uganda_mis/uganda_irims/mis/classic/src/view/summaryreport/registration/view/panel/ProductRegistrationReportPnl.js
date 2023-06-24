Ext.define('Admin.view.summaryreport.registration.view.panel.ProductRegistrationReportPnl', {
	extend: 'Ext.form.Panel',
	xtype: 'product_reg_reportPnl',
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
             value: 1,
             hidden: true
         },{
            xtype: 'productregistrationreportFiltersFrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },{
            xtype: 'productregistrationreportRepresentationViewFrm',
            region: 'center'
        }],
  bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        items: [
        {
            xtype:'externalExportBtn',
            text: 'Export(Grid Summary)',
            containerName: 'form',
            gridName: 'gridpanel' 
            
            
        },
         {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print(Summary)',
            iconCls: 'x-fa fa-file',
            handler: 'printProductRegSummary',
            xFileName: 'ProductSummaryReport',
            module: 'product',
            xPrintFunc: 'getProductGridRegistrationReport',
            xheading:'Product Application Summary Report',
            
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
          xFileName: 'ProductSummaryReport',
          module: 'product',
          xPrintFunc: 'exportProductDefinedColumns',
          xheading:'Product Application Summary Report',
          margin: '0 ,0 ,0 ,0',
        },'->',{
            text: 'Export Detailed Report',
            handler: 'func_ExpWinShow',
            childXtype: 'detailedProductRegistrationReportExportFrm',
            winTitle: 'Export Detailed Report',
            name: 'DetailedExport',
            module: 'productWin',
            winWidth: '70%',
            xstore: 'spreadsheetproductapplicationcolumnsstr',
            xFileName: 'ProductSummaryReport',
            xPrintFunc: 'exportProductDefinedColumns',
            xspreadsheet: 'spreadsheetview',
            xvisibleColumns: 'spreadsheetproductvisiblecolumns',
            xheading:'Product Application Summary Report'
        }
    ]
     }],
     listeners: {
       // afterrender: 'func_InitloadStore'
     }

 });