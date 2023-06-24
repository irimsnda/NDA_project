/**
 * Created by Sadam on 16/03/2021.
 */
Ext.define('Admin.view.summaryreport.registration.form.RegisteredProductGazetteFilters', {
	extend: 'Ext.form.Panel',
	xtype: 'registeredProductGazetteFiltersFrm',
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
                value: 1,
                hidden: true
            },{
                    xtype: 'combo',
                    fieldLabel: 'Section',
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
                        change: 'loadClassAndCategoryCombo',

                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Device Type',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'device_type_id',
                    allowBlank: true,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    hidden: true,
                    listeners: {
                         beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'par_device_types'
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
        		            	}
                    }
                  },
                  {
                      xtype: 'combo',
                      fieldLabel: 'Product Class Category',
                      forceSelection: true,
                      queryMode: 'local',
                      valueField: 'id',
                      labelAlign: 'top',
                      displayField: 'name',
                      name: 'product_class_category',
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
                                          table_name: 'par_prodclass_categories'
                                      }
                                  }
                              },
                              isLoad: false
                          },
                          beforequery: function() {
                              var store = this.getStore();

                              var all = { name: 'All', id: 0 };
                              store.insert(0, all);
                          },
                          afterrender: function(combo) {
                              combo.select(combo.getStore().getAt(0));
                          },
                          change: 'func_LoadClassificationCombo'
                      }
                  }, {
                    xtype: 'combo',
                    fieldLabel: 'Classification Category',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'classification_category',
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
                                    table_name: 'par_classifications'
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
                    xtype: 'combo',
                    fieldLabel: 'Product Type',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'product_type',
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
                                    table_name: 'par_product_types'
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
                    xtype: 'combo',
                    fieldLabel: 'Select search field',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'search_string_select',
                    allowBlank: true,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    store: Ext.create('Ext.data.Store', {
                        fields: ['id', 'name'],
                        data : [
                                    {"id":"reference_no", "name":"Reference no"},
                                    {"id":"manufacturer_name", "name":"Manufacturer Name"},
                                    {"id":"applicant_name", "name":"Applicant Name"},
                                    {"id":"active_ingredient", "name":"Active Inbredient Name"},
                                    {"id":"brand_name", "name":"Brand Name"}
                                ]}),
                    autoSelect:true,
                }, 
                {
                    xtype: 'textfield',
                    fieldLabel: 'Search with...',
                    labelAlign : 'top',
                    name: 'search_string',
                    emptyText: 'Search with...',
                    allowBlank: true,  
                    triggers: {
                        clear: {
                            type: 'clear',
                            flex: 1,
                            hideWhenEmpty: true,
                            hideWhenMouseOut: false,
                            clearOnEscape: true
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Registered From',
                    columnWidth: 0.2,
                    labelAlign : 'top',
                    format: 'Y-m-d',
                    name: 'from_date',
                    allowBlank: false,
                    minValue: new Date(2020, 6)
                },{
                    xtype: 'datefield',
                    name: 'to_date',
                    format: 'Y-m-d',
                    fieldLabel: 'Registered To',
                    labelAlign : 'top',
                    allowBlank: false,
                    minValue: new Date(2020, 6)
                },{ 
                    xtype: 'button',
                    text: 'Search Filter',
                    margin: '30 0 0 10',
                    name: 'filter_SummaryGazetteReport',
                    ui: 'soft-green',
                    iconCls: 'fa fa-search',
                    handler: 'func_LoadreportGazetteFilters',
                    formBind: true,
                },{ 
                    xtype: 'button',
                    text: 'Clear Filter',
                    margin: '30 0 0 10',
                    name: 'clear_flter',
                    ui: 'soft-red',
                    iconCls: 'fa fa-clear',
                    handler: 'func_LoadreportFilters',
                    formBind: true,
                }]
            }]
   

});