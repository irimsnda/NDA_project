var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
Ext.define('Admin.view.summaryreport.application.form.ReportFilters', {
	extend: 'Ext.form.Panel',
	xtype: 'reportFilters',
	layout: 'hbox',
	defaults:{
		bodyPadding: 1,
        margins: '0 0 0 0',
	},
   items: [{ 
        	xtype: 'fieldset',
            style: 'margin:0px',
        	layout: 'hbox',
              items:[{
                    xtype: 'combo',
                    fieldLabel: 'Section',
                    width: 100,
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
                        change: 'loadProductClassificationCombo',

                    }
                },{
                    xtype: 'combo',
                    fieldLabel: 'Sub Module',
                    width: 150,
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
                                       // module_id: 1
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
                    width: 150,
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
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    extraParams: {
                                        model_name: 'Zone'
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
                }]
        },
        {
        	xtype: 'fieldset',
        	layout: 'hbox',
            style: 'margin:0px',
        	items: [{
		            xtype: 'datefield',
		            fieldLabel: 'From',
                    allowBlank: false,
		            width: 120,
		            labelAlign : 'top',
		            name: 'from_date',
                    value: firstDay,
		            maxValue: new Date()  // limited to the current date or prior
		        }, {
		            xtype: 'datefield',
		            fieldLabel: 'To',
		            width: 120,
                    allowBlank: false,
		            labelAlign : 'top',
		            name: 'to_date',
		            value: lastDay // defaults to today
		        },
		        {
		            xtype: 'combo',
		            fieldLabel: 'Received Opt',
		            width: 130,
		            forceSelection: true,
		            queryMode: 'local',
		            valueField: 'code',
		            labelAlign : 'top',
		            displayField: 'name',
		            //store:['date_added','submission_date'],
		            name: 'receivedOpt',
		            fieldStyle: {
		                'color': 'green',
		                'font-weight': 'bold'
		            },
		            listeners:{
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'par_appprocess_definations',
                                    filters:JSON.stringify({date_option_id:1})
                                }
                               }
                            },
                            isLoad: true
                        },
		            	afterrender: function(combo) {
		            		combo.select(combo.getStore().getAt(0));	
		            	},
		            }
		           
		        },
		        {
		            xtype: 'combo',
		            fieldLabel: 'Approval Opt',
		            width: 130,
		            forceSelection: true,
		            queryMode: 'local',
		            valueField: 'code',
		            labelAlign : 'top',
		            displayField: 'description',
		            name: 'approvalOpt',
		            fieldStyle: {
		                'color': 'green',
		                'font-weight': 'bold'
		            },
		            listeners:{
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'par_appprocess_definations',
                                    filters:JSON.stringify({date_option_id:8})
                                }
                               }
                            },
                            isLoad: true
                        },
		                afterrender: function(combo) {
		            		combo.select(combo.getStore().getAt(0));	
		            	},
		           }
		        }
		       ]
        },
         {         xtype: 'button',
		            text: 'Search Filter',
		            name: 'filter_SummaryReport',
		            ui: 'soft-green',
		            iconCls: 'fa fa-search',
		            handler: 'func_LoadreportFilters',
                    formBind: true,
          }]
   

});