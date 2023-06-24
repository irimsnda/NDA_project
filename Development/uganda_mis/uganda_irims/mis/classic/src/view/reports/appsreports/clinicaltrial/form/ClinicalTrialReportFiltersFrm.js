Ext.define('Admin.view.reports.appsreport.clinicaltrialreport.form.ClinicalTrialReportFiltersFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'clinicaltrialreportfiltersfrm',
    layout: 'fit',
    defaults:{
        bodyPadding: 1,
        margins: '0 0 0 0',
    },
   items: [{ 
            xtype: 'fieldset',
            style: 'margin:0px',
            layout: 'column',
            defaults: {
                columnWidth: 0.2
            },
              items:[{
                xtype: 'hiddenfield',
                name: 'module_id',
                value: 7,
                hidden: true
            },{
                    xtype: 'combo',
                    emptyText: 'Sub Process(Sub module)',
                    margin: 5,
                    labelAlign : 'top',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    name: 'sub_module_id',
                    queryMode: 'local',
                    allowBlank: false,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'workflow/getSystemSubModules',
                                    extraParams: {
                                        model_name: 'SubModule',
                                        module_id: 7
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
                         afterrender: function(combo) {
                                    combo.select(combo.getStore().getAt(0));    
                                },
                    }
                
                },{
                    xtype: 'datefield',
                    emptyText: 'Date From',
                     margin: 5,
                    columnWidth: 0.2,
                    labelAlign : 'top',
                    format: 'Y-m-d',
                    name: 'from_date',
                    allowBlank: false,
                    minValue: new Date(2020, 6)
                },{
                    xtype: 'datefield',
                    name: 'to_date', margin: 5,
                    format: 'Y-m-d',
                    emptyText: 'Date To',
                    labelAlign : 'top',
                    allowBlank: false,
                    minValue: new Date(2020, 6),
                    maxValue: new Date()
                },{ 
                    xtype: 'button',
                    text: 'Filter Report', 
                    margin: 5,
                    name: 'filter_SummaryReport',
                    ui: 'soft-green',
                    iconCls: 'fa fa-search',
                    handler: 'loadClinicalTrialReportFilters',
                    formBind: true,
                }
               ]
            }
         
          ]
   

});