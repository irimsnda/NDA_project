Ext.define('Admin.view.summaryreport.registration.view.panel.PremiseRegistrationReportPnl', {
	extend: 'Ext.form.Panel',
	xtype: 'premise_reg_reportPnl',
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
             value: 2,
             hidden: true
         },{
            xtype: 'premiseregistrationreportFiltersFrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },{
            xtype: 'premiseregistrationreportRepresentationViewFrm',
            region: 'center'
        }],
  bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        items: [
        {
            xtype:'externalExportBtn',
            text: 'Print(Grid Summary)',
            containerName: 'form',
            gridName: 'gridpanel' 
            
            
        },
         {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print(Summary)',
            iconCls: 'x-fa fa-file',
            handler: 'printPremiseRegSummary',
            xFileName: 'PremiseummaryReport',
            module: 'premise',
            xPrintFunc: 'getPremiseGridRegistrationReport',
            xheading:'Premise Application Summary Report',
            
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
          module: 'premise',
          xFileName: 'PremiseSummaryReport',
          xPrintFunc: 'exportPremiseDefinedColumns',
          xheading:'Premise Application Summary Report',
          margin: '0 ,0 ,0 ,0',
        },
        '->',
        {
            text: 'Export Detailed Report',
            handler: 'func_ExpWinShow',
            childXtype: 'detailedPremiseRegistrationReportExportFrm',
            winTitle: 'Export Detailed Report',
            winWidth: '70%',
            module: 'premiseWin',
            name: 'DetailedExport',
            xstore: 'spreadsheetpremiseapplicationcolumnsstr',
            xFileName: 'PremiseSummaryReport',
            xPrintFunc: 'exportPremiseDefinedColumns',
            xspreadsheet: 'spreadsheetpremiseview',
            xvisibleColumns: 'spreadsheetpremisevisiblecolumns',
            xheading:'Premise Application Summary Report'
        }
    ]
     }],
     listeners: {
       // afterrender: 'func_InitloadStore'
     }

 });