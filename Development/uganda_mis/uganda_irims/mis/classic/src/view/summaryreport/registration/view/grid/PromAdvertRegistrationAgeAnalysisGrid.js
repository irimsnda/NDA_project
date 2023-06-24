Ext.define('Admin.view.summaryreport.registration.view.grid.PromAdvertRegistrationAgeAnalysisGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'promadvertregistrationageAnalysisGrid',
    layout: 'fit',
    width: '100%',
    controller: 'registrationreportviewctr',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'promadvertregistrationAgeAnalysisStr',
                groupField: 'SubModule',
                proxy: {
                    url: 'summaryreport/getPromAdvertRegistrationAgeAnalysisReport'
                }
            },
            isLoad: false
        },

           afterrender: 'func_ageAnalysisAfterRender',
           
    },
    tbar:[{
          xtype: 'form',
          ui: 'footer',
          style :'margin-bottom: 0px;',
          width: '100%',
          layout: 'fit',
		  defaults:{
			bodyPadding: 1,
	        margins: '0 0 0 0',
			},
		   items: [{ 
		        	xtype: 'fieldset',
		            style: 'margin:0px',
		            title: 'Filters',
		            collapsible: true,
		            collapsed: true,
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
		                    fieldLabel: 'Directorate',
		                    forceSelection: true,
		                    queryMode: 'local',
		                    valueField: 'id',
		                    labelAlign : 'top',
		                    displayField: 'name',
		                    name: 'directorate_id',
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
		                                    table_name: 'par_directorates'
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
		                        change: 'loadSectionCombo',

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
		                        change: 'loadProductClassificationComboFromGrid',

		                    }
		                },{
		                    xtype: 'combo',
		                    fieldLabel: 'Classification',
		                    forceSelection: true,
		                    queryMode: 'local',
		                    valueField: 'id',
		                    labelAlign : 'top',
		                    displayField: 'name',
		                    name: 'classification',
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
		                    fieldLabel: 'Assessment Date Option',
		                    labelAlign : 'top',
		                    forceSelection: true,
		                    queryMode: 'local',
		                    valueField: 'id',
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
		                                    filters: JSON.stringify({'date_option_id':3})
		                                }
		                               }
		                            },
		                            isLoad: true
		                        },
		                        afterrender: 'pickFirstEntryOnCombo',
		                    }
		                },{
		                    xtype: 'combo',
		                    fieldLabel: 'Application Option',
		                    columnWidth: 0.2,
		                    labelAlign : 'top',
		                    forceSelection: true,
		                    queryMode: 'local',
		                    valueField: 'code',
		                    labelAlign : 'top',
		                    displayField: 'name',
		                    allowBlank: false,
		                    name: 'sort_opt',
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
		                                    table_name: 'par_result_sort'
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
		                    handler: 'func_Search',
		                    formBind: true,
		                }
				       ]
		            }
		          ]
		      }],
    plugins: [{
			        ptype: 'gridexporter'
			    }],

    columns: [{
			xtype: 'gridcolumn',
			dataIndex: 'SubModule',
			name: 'SubModule',
			text: 'Application Sub Module',
			width: 150,
			tbCls: 'wrap'
			
		},{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        name: 'section_name',
        text: 'Section',
        width: 150,
        tbCls: 'wrap',
        summaryRenderer: function(){
	            return '<b>Grand Total:</b>';
	        }
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        name: 'classification_name',
        text: 'Product Classification',
        width: 150,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'total',
        name: 'total',
        text: 'Total Applications',
        width: 150,
        tbCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
		}
    ],
    features: [{ftype:'groupingsummary',startCollapsed: true}],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        hidden: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
        		       sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
			           section_id = grid.down('textfield[name=section_id]').getValue(),
			           directorate_id = grid.down('textfield[name=directorate_id]').getValue(),
			           classification_id = grid.down('textfield[name=classification]').getValue(),
			           received_opt = grid.down('textfield[name=received_opt]').getValue(),
			           evaluation_opt = grid.down('textfield[name=evaluation_opt]').getValue(),
			           from_date = grid.down('datefield[name=from_date]').getValue(),
			           sort_opt = grid.down('combo[name=sort_opt]').getValue(),
			           to_date = grid.down('textfield[name=to_date]').getValue(),
			        container=grid.up('form'),
			           module_id=container.down('hiddenfield[name=module_id]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        sub_module_id:sub_module_id,
                        section_id: section_id,
                        directorate_id: directorate_id,
                        module_id:module_id,
                        classification_id: classification_id,
                        from_date: from_date,
                        sort_opt:sort_opt,
                        received_opt: received_opt,
                        evaluation_opt: evaluation_opt,
                        to_date: to_date

                }
                
        	},
        
        
    }],
    dockedItems: [
			       {
			        xtype: 'toolbar',
			        flex: 1,
			        dock: 'bottom',
			        ui: 'footer',
			        layout: {
			            pack: 'end',
			            type: 'hbox'
			        },
			        items: ['->',
			            {
			                xtype: 'exportbtn',
			                text: 'Print(Summary)'
			               
			            }
			          ]
			    }
					],

    });
