Ext.define('Admin.view.reports.appsreport.promotionadvertisementreport.form.PromotionAdvertisementReportFiltersFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'promotionadvertisementreportfiltersfrm',
    layout:'column',
    defaults: {
        columnWidth: 0.25
    },
      items:[{
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 14,
        hidden: true
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
                            url: 'workflow/getSystemSubModules',
                            extraParams: {
                                model_name: 'SubModule',
                                module_id: 14
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
            xtype: 'combo',
            emptyText: 'Select Promotion & Advertisement Product Type(Sections)',
             margin: 2,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'section_id',
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
                        url: 'newreports/getSectionParams',
                        extraParams: {
                            table_name: 'par_sections'
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


            }
        },{
            xtype: 'combo',
            emptyText: 'Select Advertisement Type',
             margin: 2,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'advertisement_type_id',
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
                            table_name: 'par_advertisement_types'
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
        },
        {
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
            handler: 'loadPromotionAdvertisementReportFilters',
            formBind: true,
        }
       ]

});