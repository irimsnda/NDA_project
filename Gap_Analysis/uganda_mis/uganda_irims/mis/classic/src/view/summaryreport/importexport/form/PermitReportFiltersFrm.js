var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
Ext.define('Admin.view.summaryreport.product.form.PermitReportFiltersFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'permitReportFiltersFrm',
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
                    xtype: 'combo',
                    fieldLabel: 'Section',
                    labelAlign : 'top',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    name: 'section_id',
                    queryMode: 'local',
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
                            }

                    }
                
                },{
                    xtype: 'combo',
                    fieldLabel: 'Import/Export Category',
                    labelAlign : 'top',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    name: 'category_type',
                    queryMode: 'local',
                    hidden: true, 
                    allowBlank: true,
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
                                    table_name: 'par_permit_typecategories'
                                }
                               }
                            },
                            isLoad: true
                        },
                        beforequery: function() {
                            var store=this.getStore();
                            
                            var all={name: 'All',id:0};
                              store.insert(0, all);
                            }

                    }
                
                },{
                    xtype: 'combo',
                    fieldLabel: 'Sub Modules',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'sub_module_id',
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
                                    table_name: 'sub_modules',
                                    filters : JSON.stringify({'module_id': 4})
                                }
                               }
                            },
                            isLoad: true
                        },
                        beforequery: function() {
                            var store=this.getStore();
                            
                            var all={name: 'All',id:0};
                              store.insert(0, all);
                            }

                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Receiving Date Option',
                    labelAlign : 'top',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'received_opt',
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
                                    table_name: 'par_appprocess_definations',
                                    filters: JSON.stringify({'date_option_id':1})
                                }
                               }
                            },
                            isLoad: true
                        },
                        afterrender: 'pickFirstEntryOnCombo',
                    }
                },{
                    xtype: 'combo',
                    fieldLabel: 'Inspection Date Option',
                    labelAlign : 'top',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'code',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'evaluation_opt',
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
                                    table_name: 'par_appprocess_definations',
                                    filters: JSON.stringify({'date_option_id':4})
                                }
                               }
                            },
                            isLoad: true
                        },
                        afterrender: 'pickFirstEntryOnCombo',
                    }
                },{
                    xtype: 'datefield',
                    fieldLabel: 'From',
                    columnWidth: 0.2,
                    labelAlign : 'top',
                    format: 'Y-m-d',
                    name: 'from_date',
                    allowBlank: false
                },{
                    xtype: 'datefield',
                    name: 'to_date',
                    format: 'Y-m-d',
                    fieldLabel: 'To',
                    labelAlign : 'top',
                    allowBlank: false
                },{ 
                    xtype: 'button',
                    text: 'Search Filter',
                    margin: '30 0 0 10',
                    name: 'filter_SummaryReport',
                    ui: 'soft-green',
                    iconCls: 'fa fa-search',
                    handler: 'func_RefreshGridReportFilters',
                    formBind: true,
                }
		       ]
            }
         
          ]
   

});