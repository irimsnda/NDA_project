var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
Ext.define('Admin.view.summaryreport.product.form.QueriedApplicationReportsFilterFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'queriedapplicationreportsfilterfrm',
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
                                        model_name: 'SubModule',
                                        module_id: 2
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
                            },

                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Queried from',
                    columnWidth: 0.2,
                    labelAlign : 'top',
                    format: 'Y-m-d',
                    name: 'queriedfrom_date',
                    allowBlank: false
                },{
                    xtype: 'datefield',
                    name: 'queriedto_date',
                    format: 'Y-m-d',
                    fieldLabel: 'Queried To',
                    labelAlign : 'top',
                    allowBlank: false
                },{ 
                    xtype: 'button',
                    text: 'Search Filter',
                    margin: '30 0 0 10',
                    name: 'filter_SummaryReport',
                    ui: 'soft-green',
                    iconCls: 'fa fa-search',
                    handler: 'func_QueriedRefreshGridReportFilters',
                    formBind: true,
                }
		       ]
            }
         
          ]
   

});