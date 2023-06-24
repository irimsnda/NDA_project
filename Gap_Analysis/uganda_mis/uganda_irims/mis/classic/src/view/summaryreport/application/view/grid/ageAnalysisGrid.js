Ext.define('Admin.view.summaryreport.application.view.grid.AgeAnalysisGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'ageAnalysisGrid',
    layout: 'fit',
    width: '100%',
    controller: 'reportviewctr',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'ageAnalysisStr',
                groupField: 'section',
                proxy: {
                    url: 'summaryreport/getAgeAnalysis'
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
          layout: {
            type: 'vbox',
            align: 'stretch'
          },
          items: [{
          	xtype: 'fieldset',
          	flex: 1,
          	layout: 'column',
          	style :'margin: 1px;',
          	padding: '0 2 0 5',
          	defaults:{
          	padding: '0 2 0 0',
             },
          	items: [{
		            xtype: 'combo',
		            fieldLabel: 'Section',
		            labelAlign : 'top',
                    columnWidth: 0.15,
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
		                beforequery: 'addAllToCombo',
		                afterrender: 'pickFirstEntryOnCombo',
		              //  change: 'loadProductClassificationComboFromGrid'
		            }
		        },{
		            xtype: 'combo',
		            fieldLabel: 'Sub Modules',
                    columnWidth: 0.2,
		            labelAlign : 'top',
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
		                            table_name: 'sub_modules'
		                        }
		                       }
		                    },
		                    isLoad: false
		                },
		                beforequery: 'addAllToCombo',
		                afterrender: 'pickFirstEntryOnCombo',
		            }
		        },{
		            xtype: 'combo',
		            fieldLabel: 'Zones',
                    columnWidth: 0.2,
		            labelAlign : 'top',
		            forceSelection: true,
		            queryMode: 'local',
		            valueField: 'id',
		            labelAlign : 'top',
		            displayField: 'name',
		        	allowBlank: false,
		            name: 'zone_id',
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
		                            table_name: 'par_zones'
		                        }
		                       }
		                    },
		                    isLoad: true
		                },
		                beforequery: 'addAllToCombo',
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
		            xtype: 'combo',
		            fieldLabel: 'Queried Type',
                    columnWidth: 0.2,
		            labelAlign : 'top',
		            forceSelection: true,
		            queryMode: 'local',
		            valueField: 'id',
		            labelAlign : 'top',
		            displayField: 'name',
		        	allowBlank: false,
		            name: 'queried_type',
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
		                            table_name: 'par_query_types'
		                        }
		                       }
		                    },
		                    isLoad: true
		                },
		                beforequery: 'addAllToCombo',
		                afterrender: 'pickFirstEntryOnCombo',
		            }
		           
		        }]
		    },{
		    	xtype:'fieldset',
		    	padding: '0 0 0 0',
		    	layout: 'column',
		    	defaults:{
		    		padding: '0 5 0 0'
		    	},
		    	items: [{
		            xtype: 'combo',
		            fieldLabel: 'From',
		            labelAlign : 'top',
                    columnWidth: 0.2,
		            forceSelection: true,
		            queryMode: 'local',
		            valueField: 'id',
		            labelAlign : 'top',
		            displayField: 'name',
		            name: 'from_opt',
		        	allowBlank: false,
		        	padding: '0 0 5 5',
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
		                            table_name: 'par_appprocess_definations'
		                        }
		                       }
		                    },
		                    isLoad: true
		                },
		                afterrender: 'pickFirstEntryOnCombo',
		            }
		        },{
		        	xtype: 'datefield',
		            fieldLabel: 'Date',
                    columnWidth: 0.2,
		            labelAlign : 'top',
		        	format: 'Y-m-d',
		        	padding: '0 0 5 0',
		        	name: 'from_date',
		        	allowBlank: false
		        },{
		            xtype: 'combo',
		            fieldLabel: 'To',
		            labelAlign : 'top',
                    columnWidth: 0.2,
		            forceSelection: true,
		            queryMode: 'local',
		            valueField: 'id',
		            labelAlign : 'top',
		            displayField: 'name',
		            name: 'to_opt',
		        	allowBlank: false,
		        	padding: '0 0 5 5',
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
		                            table_name: 'par_appprocess_definations'
		                        }
		                       }
		                    },
		                    isLoad: true
		                },

		                afterrender: 'pickFirstEntryOnCombo',
		            }
		        },{
		        	xtype: 'datefield',
                    columnWidth: 0.2,
		        	name: 'to_date',
		        	padding: '0 0 5 0',
		        	format: 'Y-m-d',
		            fieldLabel: 'Date',
		            labelAlign : 'top',
		        	allowBlank: false
		        },{
		            xtype: 'button',
                    columnWidth: 0.17,
			        iconCls: 'fa fa-search',
			        text: 'Search',
			        handler: 'func_Search',
			        ui: 'soft-green',
			       style: 'height: 23px;margin-top:30px;',
			        formBind: true
		        }],
		    }],
		   }],
    plugins: [{
			        ptype: 'gridexporter'
			    }],

    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module',
        name: 'sub_module',
        text: 'Application Process',
        width: 150,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'classification',
        name: 'classification',
        text: 'Classification',
        width: 150,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_type',
        name: 'product_type',
        text: 'Product Type',
        width: 130,
        tbCls: 'wrap'
       
	},{
        xtype: 'gridcolumn',
        dataIndex: 'total',
        name: 'total',
        text: 'Total Applications',
        width: 150,
        tbCls: 'wrap'
       
		}
    ],
    features: [{ftype:'grouping',startCollapsed: true}],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        hidden: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
        		    zone_id=grid.down('combo[name=zone_id]').getValue(),
        		    section_id=grid.down('combo[name=section_id]').getValue(),
        		    to_date=grid.down('datefield[name=to_date]').getValue(),
        		    from_date=grid.down('datefield[name=from_date]').getValue(),
        		    sub_module_id=grid.down('combo[name=sub_module_id]').getValue(),
        		    from_opt=grid.down('combo[name=from_opt]').getValue(),
        		    to_opt=grid.down('combo[name=to_opt]').getValue(),
        		    sort_opt=grid.down('combo[name=sort_opt]').getValue(),
        		    queried_type=grid.down('combo[name=queried_type]').getValue(),
        		    panel=grid.up('form'),
        		    module_id=panel.down('textfield[name=module_id]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        module_id:module_id,
                        zone_id:zone_id,
                        to_date:to_date,
                        from_date:from_date,
                        section_id:section_id,
                        sub_module_id:sub_module_id,
                        from_opt:from_opt,
                        to_opt:to_opt,
                        sort_optsort_opt:sort_optsort_opt,
                        queried_type:queried_type

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
			         //    '->',{
				        //     xtype: 'combo',
				        //     emptyText: 'Product Type',
				        //     width: 250,
				        //     forceSelection: true,
				        //     queryMode: 'local',
				        //     valueField: 'id',
				        //     labelAlign : 'top',
				        //     displayField: 'name',
				        //     name: 'product_type',
				        //     fieldStyle: {
				        //         'color': 'green',
				        //         'font-weight': 'bold'
				        //     },
				        //     listeners: {
				        //         beforerender: {
				        //             fn: 'setOrgConfigCombosStore',
				        //            config: {
				        //                 pageSize: 100,
				        //                 proxy: {
				        //                 url: 'configurations/getConfigParamFromTable',
				        //                 extraParams: {
				        //                     table_name: 'par_product_types'
				        //                 }
				        //                }
				        //             },
				        //             isLoad: true
				        //         }
				        //     }
				        // },{
				        //     xtype: 'combo',
				        //     emptyText: 'Classification',
				        //     width: 200,
				        //     forceSelection: true,
				        //     queryMode: 'local',
				        //     valueField: 'id',
				        //     labelAlign : 'top',
				        //     displayField: 'name',
				        //     name: 'classification',
				        //     fieldStyle: {
				        //         'color': 'green',
				        //         'font-weight': 'bold'
				        //     },
				        //     listeners: {
				        //         beforerender: {
				        //             fn: 'setOrgConfigCombosStore',
				        //            config: {
				        //                 pageSize: 100,
				        //                 proxy: {
				        //                 url: 'configurations/getConfigParamFromTable',
				        //                 extraParams: {
				        //                     table_name: 'par_classifications'
				        //                 }
				        //                }
				        //             },
				        //             isLoad: true
				        //         }
				        //     }
				        // },{
			         //    	xtype: 'button',
			         //    	ui: 'soft-green',
			         //    	text: 'Export Detailed Report',
			         //    	handler: 'ExportSummaryAgeAnalysis'
			         //    }
			          ]
			    }
					],

    });
