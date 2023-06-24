var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
Ext.define('Admin.view.summaryreport.revenue.form.RevenueFilterFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'revenueFilterFrm',
	layout: 'column',
	defaults:{
		margin: 5,
        columnWidth: 0.25
	},
   items: [ {
                xtype: 'combo',
                fieldLabel: 'Module',
          
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                labelAlign : 'top',
                displayField: 'name',
                name: 'module_id',
                allowBlank: true,
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold'
                },
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'modules'
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
                    change: 'func_setSubmodule'

                }
            },{
                xtype: 'combo',
                fieldLabel: 'Sub Module',
                emptyText: 'All',
          
                labelAlign : 'top',
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                name: 'sub_module_id',
                queryMode: 'local',
                allowBlank: true,
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold'
                },
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'sub_modules',
                                }
                            }
                        },
                        isLoad: false
                    },
                    
                
                }

            },{
                xtype: 'combo',
                fieldLabel: 'Section',
          
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                labelAlign : 'top',
                displayField: 'name',
                name: 'section_id',
                allowBlank: true,
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold'
                },
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                            url: 'configurations/getConfigParamFromTable',
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
                    afterrender: function(combo) {
                                combo.select(combo.getStore().getAt(0));    
                            },

                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'Zone',
          
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                labelAlign : 'top',
                displayField: 'name',
                name: 'zone_id',
                allowBlank: false,
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold'
                },
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'par_zones'
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
                            }
                }
            },{
                xtype: 'datefield',
                fieldLabel: 'From',
                allowBlank: false,
              
                labelAlign : 'top',
                format: 'Y-m-d',
                name: 'from_date',
                value: firstDay,
                maxValue: new Date()  // limited to the current date or prior
            }, {
                xtype: 'datefield',
                fieldLabel: 'To',
           format: 'Y-m-d',
                allowBlank: false,
                labelAlign : 'top',
                name: 'to_date',
                value: lastDay // defaults to today
            },
            {         xtype: 'button',
                       text: 'Search Filter',
                       name: 'filter_Report',
                       ui: 'soft-green',
                       iconCls: 'fa fa-search',
                       handler: 'func_LoadreportFilters',
                       formBind: true,
             }
        ]
   

});