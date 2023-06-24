Ext.define('Admin.view.reports.appsreport.controlleddrugsreport.form.LocalSupplyFiltersFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'localsupplyreportfiltersfrm',
    layout: 'column',
    defaults: {
        columnWidth: 0.25
    },
      items:[{
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 12,
        hidden: true
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    },{
            xtype: 'combo',
            emptyText: 'Sub Process(Sub module)',
             margin: 2,
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
                            url: 'newreports/getControlledDrugsSubModules',
                            extraParams: {
                                model_name: 'SubModule',
                                module_id: 12,
                                is_order:1
                            }
                        }
                    },
                    isLoad: true
                },
                 beforequery: function() {
                    var store=this.getStore();
                    },
                 afterrender: function(combo) {
                            combo.select(combo.getStore().getAt(0));    
                        },
                    
            }
        
        },{
            xtype: 'datefield',
            emptyText: 'Date From',
              margin: 2,
            columnWidth: 0.25,
            labelAlign : 'top',
            format: 'Y-m-d',
            name: 'from_date',
            allowBlank: false,
            minValue: new Date(2020, 6)
        },{
            xtype: 'datefield',
            name: 'to_date',  margin: 2,
            format: 'Y-m-d',
            emptyText: 'Date To',
            labelAlign : 'top',
            allowBlank: false,
            minValue: new Date(2020, 6),
            maxValue: new Date()
        },{ 
            xtype: 'button',
            text: 'Filter Report',  margin: 2,
            name: 'filter_SummaryReport',
            ui: 'soft-green',
            iconCls: 'fa fa-search',
            handler: 'loadOrderSupplyReportFilters',
            formBind: true,
        }
       ]
});