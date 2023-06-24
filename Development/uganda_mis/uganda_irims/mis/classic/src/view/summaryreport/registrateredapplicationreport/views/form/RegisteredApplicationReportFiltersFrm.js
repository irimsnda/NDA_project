Ext.define('Admin.view.summaryreport.registeredapplicationreport.views.form.RegisteredApplicationReportFiltersFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'registeredApplicationReportFiltersFrm',
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
                    fieldLabel: 'Module',
                    labelAlign : 'top',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    name: 'module_id',
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
                                pageSize: 100,
                                proxy: {
                                url: 'summaryreport/getRegistrationApplicableModules'
                               }
                            },
                            isLoad: true
                        },
                         change: function(combo, newVal, oldVal, eopts) {
        		            		var form = this.up('form'),
        		            			sub_moduleStr = form.down('combo[name=sub_module_id]').getStore();

        		            		sub_moduleStr.removeAll();
        		            		sub_moduleStr.load({params:{module_id:newVal}});
        		            	},
                    }
                
                },{
                    xtype: 'combo',
                    fieldLabel: 'Sub Module',
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
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'workflow/getSystemSubModules',
                                    extraParams: {
                                        model_name: 'SubModule'
                                    }
                                }
                            },
                            isLoad: false
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
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Registration Date Option',
                    labelAlign : 'top',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'registration_date',
                    value: 0,
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
                                    table_name: 'par_appprocess_definations',
                                    filters: JSON.stringify({'date_option_id':9})
                                }
                               }
                            },
                            isLoad: true
                        },
                        afterrender: 'pickFirstEntryOnCombo',
                    }
                },{
                    xtype: 'combo',
                    fieldLabel: 'Approval Date Option',
                    labelAlign : 'top',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'code',
                    labelAlign : 'top',
                    displayField: 'name',
                    value: 0,
                    name: 'approval_opt',
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
                                    table_name: 'par_appprocess_definations',
                                    filters: JSON.stringify({'date_option_id':8})
                                }
                               }
                            },
                            isLoad: true
                        },
                        afterrender: 'pickFirstEntryOnCombo',
                    }
                },{
                    xtype: 'combo',
                    fieldLabel: 'Expiry Date Option',
                    labelAlign : 'top',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'code',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'expiry_date',
                    value: 0,
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
                                    table_name: 'par_appprocess_definations',
                                    filters: JSON.stringify({'date_option_id':10})
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
                    value: 0,
                    name: 'from_date',
                    allowBlank: true
                },{
                    xtype: 'datefield',
                    name: 'to_date',
                    format: 'Y-m-d',
                    fieldLabel: 'To',
                    value: 0,
                    labelAlign : 'top',
                    allowBlank: true
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
