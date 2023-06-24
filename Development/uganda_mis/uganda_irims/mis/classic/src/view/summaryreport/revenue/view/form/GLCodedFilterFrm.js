var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
Ext.define('Admin.view.summaryreport.revenue.form.GLCodedFilterFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'gLCodedFilterFrm',
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
                    width: 170,
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
                }
                ,{
                    xtype: 'combo',
                    fieldLabel: 'GL Accounts',
                    width: 250,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'description',
                    name: 'gl_account',
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
                                    table_name: 'par_gl_accounts'
                                }
                               }
                            },
                            isLoad: true
                        },
                        beforequery: function() {
                            var store=this.getStore();
                            
                            var all={description: 'All',id:0};
                              store.insert(0, all);
                            },
                        afterrender: function(combo) {
                                    combo.select(combo.getStore().getAt(0));    
                                },

                    }
                },{
                    xtype: 'combo',
                    fieldLabel: 'Zone',
                    width: 170,
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
                                },

                    }
                }
               ]
        },
        {
        	xtype: 'fieldset',
        	layout: 'hbox',
            style: 'margin:0px',
        	items: [{
		            xtype: 'datefield',
		            fieldLabel: 'From',
                    allowBlank: false,
		            width: 150,
		            labelAlign : 'top',
                    name: 'from_date',
                    format:'Y-m-d',
                    value: firstDay,
		            maxValue: new Date()  // limited to the current date or prior
		        }, {
		            xtype: 'datefield',
		            fieldLabel: 'To',
		            width: 150, format:'Y-m-d',
                    allowBlank: false,
		            labelAlign : 'top',
		            name: 'to_date',
		            value: lastDay // defaults to today
		        }
		       ]
        },
         {         xtype: 'button',
		            text: 'Search Filter',
		            name: 'filter_Report',
		            ui: 'soft-green',
		            iconCls: 'fa fa-search',
		            handler: 'func_LoadDailyTransreportFilters',
                    formBind: true,
          }]
   

});